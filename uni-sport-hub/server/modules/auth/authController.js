const User = require("../user/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendRegistrationStatusEmail } = require("../../utils/emailService");

// 🔐 Generate Token (include isSelector)
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, isSelector: user.isSelector },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// =========================
// ✅ REGISTER USER
// =========================
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    role,

    // common
    phoneNumber,
    address,

    // player
    universityId,
    universityName,
    sportType,
    age,
    gender,

    // coach
    workingUniversities,
    experience,
    qualifications,
    description
  } = req.body;

  try {
    // 🔍 Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔥 Default states
    let status = "pending";
    let selectorApproved = false;
    let adminApproved = false;
    let isSelector = false;

    // =========================
    // 🎯 VALIDATION
    // =========================

    if (role === "player") {
      if (
        !phoneNumber ||
        !address ||
        !universityId ||
        !sportType ||
        !age ||
        !gender
      ) {
        return res.status(400).json({
          message: "Player must fill all required fields"
        });
      }
    }

    if (role === "coach") {
      if (
        !phoneNumber ||
        !address ||
        !sportType ||
        !experience ||
        !workingUniversities
      ) {
        return res.status(400).json({
          message: "Coach must fill all required fields"
        });
      }
    }

    // =========================
    // 👑 ROLE-BASED APPROVAL
    // =========================

    // 👑 Admin registration → auto approved
    if (role === "admin") {
      status = "approved";
      adminApproved = true;
    }

    // 👑 If ADMIN is creating users → auto approve everything 🔥
    if (req.user && req.user.role === "admin") {
      status = "approved";
      selectorApproved = true;
      adminApproved = true;
    }

    // =========================
    // 🧠 CREATE USER
    // =========================

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,

      // common
      phoneNumber,
      address,

      // player
      universityId,
      universityName,
      sportType,
      age,
      gender,

      // coach
      workingUniversities,
      experience,
      qualifications,
      description,

      // approvals
      status,
      selectorApproved,
      adminApproved,

      // selector flag
      isSelector
    });

    // ✅ Response
    await sendRegistrationStatusEmail(user);

    res.status(201).json({
      message: "Registration submitted",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        isSelector: user.isSelector,
        status: user.status
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// ✅ LOGIN USER
// =========================
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // =========================
    // 👑 ADMIN BYPASS 🔥
    // =========================
    if (user.role === "admin") {
      const token = generateToken(user);

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isSelector: user.isSelector,
          status: user.status
        }
      });
    }

    // =========================
    // ❌ REJECTED
    // =========================
    if (user.status === "rejected") {
      return res.status(403).json({
        message: "Your registration was rejected"
      });
    }

    // =========================
    // 🏏 PLAYER
    // =========================
    if (user.role === "player" && user.status !== "approved") {
      return res.status(403).json({
        message: "Waiting for coach approval"
      });
    }

    // =========================
    // 🧑‍🏫 COACH (2-step approval)
    // =========================
    if (user.role === "coach") {
      if (!user.selectorApproved) {
        return res.status(403).json({
          message: "Waiting for selector approval"
        });
      }

      if (!user.adminApproved) {
        return res.status(403).json({
          message: "Waiting for admin approval"
        });
      }
    }

    // =========================
    // 🔐 PASSWORD CHECK
    // =========================
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // =========================
    // 🎟 TOKEN
    // =========================
    const token = generateToken(user);

    // =========================
    // ✅ RESPONSE
    // =========================
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isSelector: user.isSelector,
        status: user.status
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 🔥 GET coaches approved by selector but not admin
// 👑 Admin: Get coaches approved by selector

module.exports = { registerUser, loginUser };