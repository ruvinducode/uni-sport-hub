const express = require("express");
const router = express.Router();

const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const User = require("../models/User");

// =========================
// 🔐 PROFILE
// =========================
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User profile fetched successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// =========================
// 👑 ADMIN ONLY
// =========================
router.get("/admin-only", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin 👑" });
});


// =========================
// 🧑‍🏫 COACH (includes selector)
// =========================
router.get("/coach-only", protect, authorizeRoles("coach"), (req, res) => {
  res.json({ message: "Welcome Coach 🧑‍🏫" });
});


// =========================
// 🎯 SELECTOR ONLY (UPDATED 🔥)
// =========================
router.get(
  "/selector-only",
  protect,
  authorizeRoles("selector"),
  (req, res) => {
    res.json({ message: "Welcome Selector 🎯" });
  }
);


// =========================
// 🏏 PLAYER ONLY
// =========================
router.get("/player-only", protect, authorizeRoles("player"), (req, res) => {
  res.json({ message: "Welcome Player 🏏" });
});


// =========================
// 🔥 SUPER TEST (ANY LOGGED USER)
// =========================
router.get("/all-users", protect, (req, res) => {
  res.json({
    message: "Any authenticated user can access this route",
    user: req.user
  });
});

module.exports = router;