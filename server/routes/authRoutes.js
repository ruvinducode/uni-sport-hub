const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

// =========================
// 🔓 PUBLIC ROUTES
// =========================

// Register (normal users: player / coach)
router.post("/register", registerUser);

// Login (all users)
router.post("/login", loginUser);


// =========================
// 👑 ADMIN ROUTES (NEW 🔥)
// =========================

// Admin creates users (auto-approved)
router.post("/admin/register", protect, registerUser);


// =========================
// 🔐 AUTHENTICATED ROUTES
// =========================

// Get FULL logged-in user profile
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User authenticated",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;