const User = require("../user/User");
const bcrypt = require("bcryptjs");
const {
  sendRegistrationStatusEmail,
  sendSelectorRoleEmail
} = require("../../utils/emailService");

// =========================
//  APPROVE PLAYER
// =========================
exports.approvePlayer = async (req, res) => {
  try {
    const player = await User.findById(req.params.id);

    if (!player || player.role !== "player") {
      return res.status(404).json({
        message: "Player not found"
      });
    }

    player.status = "approved";
    player.approvedBy = req.user.id;

    await player.save();
    await sendRegistrationStatusEmail(player);

    res.json({
      message: "Player approved successfully",
      player
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
//  REJECT PLAYER
// =========================
exports.rejectPlayer = async (req, res) => {
  try {
    const player = await User.findById(req.params.id);

    if (!player || player.role !== "player") {
      return res.status(404).json({
        message: "Player not found"
      });
    }

    player.status = "rejected";
    player.rejectedBy = req.user.id;

    await player.save();
    await sendRegistrationStatusEmail(player);

    res.json({
      message: "Player rejected",
      player
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
//  SELECTOR APPROVES COACH
// =========================
exports.approveCoachBySelector = async (req, res) => {
  try {
    const coach = await User.findById(req.params.id);

    if (!coach || coach.role !== "coach") {
      return res.status(404).json({
        message: "Coach not found"
      });
    }

    coach.selectorApproved = true;
    coach.approvedBy = req.user.id;

    await coach.save();
    await sendRegistrationStatusEmail(coach);

    res.json({
      message: "Coach approved by selector",
      coach
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
//  ADMIN FINAL APPROVE COACH
// =========================
exports.approveCoachByAdmin = async (req, res) => {
  try {
    const coach = await User.findById(req.params.id);

    if (!coach || coach.role !== "coach") {
      return res.status(404).json({
        message: "Coach not found"
      });
    }

    if (!coach.selectorApproved) {
      return res.status(400).json({
        message: "Coach must be approved by selector first"
      });
    }

    coach.adminApproved = true;
    coach.status = "approved";
    coach.approvedBy = req.user.id;

    await coach.save();
    await sendRegistrationStatusEmail(coach);

    res.json({
      message: "Coach fully approved",
      coach
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
//  REJECT COACH
// =========================
exports.rejectCoach = async (req, res) => {
  try {
    const coach = await User.findById(req.params.id);

    if (!coach || coach.role !== "coach") {
      return res.status(404).json({
        message: "Coach not found"
      });
    }

    coach.status = "rejected";
    coach.rejectedBy = req.user.id;

    await coach.save();
    await sendRegistrationStatusEmail(coach);

    res.json({
      message: "Coach rejected",
      coach
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// 👑 CREATE SELECTOR
// =========================
exports.createSelector = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      address,
      sportType,
      experience
    } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const selector = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "coach",
      isSelector: true,
      phoneNumber,
      address,
      sportType,
      experience,
      status: "approved",
      adminApproved: true,
      selectorApproved: true
    });

    await sendSelectorRoleEmail({ user: selector, mode: "created" });

    res.status(201).json({
      message: "Selector created successfully",
      selector: {
        id: selector._id,
        name: selector.name,
        email: selector.email,
        role: selector.role,
        isSelector: selector.isSelector,
        status: selector.status
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// 👑 PROMOTE COACH TO SELECTOR
// =========================
exports.promoteToSelector = async (req, res) => {
  try {
    const coach = await User.findById(req.params.id);

    if (!coach || coach.role !== "coach") {
      return res.status(404).json({
        message: "Coach not found"
      });
    }

    if (coach.status !== "approved") {
      return res.status(400).json({
        message: "Only approved coaches can be promoted"
      });
    }

    if (coach.isSelector) {
      return res.status(400).json({
        message: "Already a selector"
      });
    }

    coach.isSelector = true;
    await coach.save();
    await sendSelectorRoleEmail({ user: coach, mode: "promoted" });

    res.json({
      message: "Coach promoted to selector 🎯",
      user: {
        id: coach._id,
        name: coach.name,
        isSelector: coach.isSelector
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// 👑 GET APPROVED COACHES FOR PROMOTION
// =========================
exports.getApprovedCoachesForPromotion = async (req, res) => {
  try {
    const coaches = await User.find({
      role: "coach",
      status: "approved",
      isSelector: false
    }).select("-password");

    res.json({
      count: coaches.length,
      coaches
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// 📌 GET PENDING PLAYERS
// =========================
exports.getPendingPlayers = async (req, res) => {
  try {
    const players = await User.find({
      role: "player",
      status: "pending"
    }).select("-password");

    res.json({
      count: players.length,
      players
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// 📌 GET PENDING COACHES
// =========================
exports.getPendingCoaches = async (req, res) => {
  try {
    const coaches = await User.find({
      role: "coach",
      status: "pending",
      selectorApproved: false
    }).select("-password");

    res.json({
      count: coaches.length,
      coaches
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// 📌 GET ALL SELECTORS
// =========================
exports.getAllSelectors = async (req, res) => {
  try {
    const selectors = await User.find({
      role: "coach",
      isSelector: true
    }).select("-password");

    res.json({
      count: selectors.length,
      selectors
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// 👑 NEW: GET SELECTOR-APPROVED COACHES
// =========================
exports.getSelectorApprovedCoaches = async (req, res) => {
  try {
    const coaches = await User.find({
      role: "coach",
      status: "pending",
      selectorApproved: true,
      adminApproved: false
    }).select("-password");

    res.json({
      count: coaches.length,
      coaches
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
