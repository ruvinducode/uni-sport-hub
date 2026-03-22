const express = require("express");
const router = express.Router();

const {
  approvePlayer,
  rejectPlayer,
  approveCoachBySelector,
  approveCoachByAdmin,
  rejectCoach,
  createSelector,
  promoteToSelector,
  getPendingPlayers,
  getPendingCoaches,
  getAllSelectors,
  getSelectorApprovedCoaches,   // 🔥 NEW
  getApprovedCoachesForPromotion
} = require("./approvalController");

const { protect, authorizeRoles } = require("../../middleware/authMiddleware");

// =========================
// 🧑‍🏫 APPROVE PLAYER
// =========================
router.put(
  "/player/approve/:id",
  protect,
  authorizeRoles("coach", "selector", "admin"),
  approvePlayer
);

// =========================
// ❌ REJECT PLAYER
// =========================
router.put(
  "/player/reject/:id",
  protect,
  authorizeRoles("coach", "selector", "admin"),
  rejectPlayer
);

// =========================
// 🎯 SELECTOR APPROVES COACH
// =========================
router.put(
  "/coach/selector-approve/:id",
  protect,
  authorizeRoles("selector"),
  approveCoachBySelector
);

// =========================
// 👑 ADMIN APPROVES COACH
// =========================
router.put(
  "/coach/admin-approve/:id",
  protect,
  authorizeRoles("admin"),
  approveCoachByAdmin
);

// =========================
// ❌ REJECT COACH
// =========================
router.put(
  "/coach/reject/:id",
  protect,
  authorizeRoles("selector", "admin"),
  rejectCoach
);

// =========================
// 👑 CREATE SELECTOR
// =========================
router.post(
  "/create-selector",
  protect,
  authorizeRoles("admin"),
  createSelector
);

// =========================
// 👑 PROMOTE COACH → SELECTOR
// =========================
router.put(
  "/promote-selector/:id",
  protect,
  authorizeRoles("admin"),
  promoteToSelector
);

// =========================
// 📌 GET PENDING PLAYERS
// =========================
router.get(
  "/players/pending",
  protect,
  authorizeRoles("coach", "selector", "admin"),
  getPendingPlayers
);

// =========================
// 📌 GET PENDING COACHES
// =========================
router.get(
  "/coaches/pending",
  protect,
  authorizeRoles("selector", "admin"),
  getPendingCoaches
);

// =========================
// 👑 GET ALL SELECTORS
// =========================
router.get(
  "/selectors",
  protect,
  authorizeRoles("admin"),
  getAllSelectors
);

// =========================
// 👑 NEW: SELECTOR-APPROVED COACHES (Admin Dashboard)
// =========================
router.get(
  "/coaches/selector-approved",
  protect,
  authorizeRoles("admin"),
  getSelectorApprovedCoaches
);

// =========================
// 👑 APPROVED COACHES FOR PROMOTION
// =========================
router.get(
  "/coaches/approved",
  protect,
  authorizeRoles("admin"),
  getApprovedCoachesForPromotion
);

module.exports = router;