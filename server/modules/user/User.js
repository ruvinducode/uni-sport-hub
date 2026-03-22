const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // =========================
    //  BASIC INFO
    // =========================
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["player", "coach", "admin"],
      default: "player"
    },

    // =========================
    //  ROLE EXTENSION
    // =========================
    isSelector: {
      type: Boolean,
      default: false
    },

    // =========================
    //  COMMON (Player + Coach)
    // =========================
    phoneNumber: {
      type: String,
      required: function () {
        return this.role === "player" || this.role === "coach";
      }
    },

    address: {
      type: String,
      required: function () {
        return this.role === "player" || this.role === "coach";
      }
    },

    // =========================
    //  PLAYER DETAILS
    // =========================
    universityId: {
      type: String,
      required: function () {
        return this.role === "player";
      }
    },

    universityName: {
      type: String,
      required: function () {
        return this.role === "player";
      }
    },

    sportType: {
      type: String,
      required: function () {
        return this.role === "player" || this.role === "coach";
      }
    },

    age: {
      type: Number,
      required: function () {
        return this.role === "player";
      }
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: function () {
        return this.role === "player";
      }
    },

    // =========================
    //  COACH DETAILS
    // =========================
    workingUniversities: {
      type: [String],
      required: function () {
        return this.role === "coach";
      }
    },

    experience: {
      type: Number,
      required: function () {
        return this.role === "coach";
      }
    },

    qualifications: {
      type: String
    },

    description: {
      type: String
    },

    // =========================
    //  APPROVAL SYSTEM
    // =========================
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    // Coach approval flow
    selectorApproved: {
      type: Boolean,
      default: false
    },

    adminApproved: {
      type: Boolean,
      default: false
    },

    // =========================
    //  TRACKING (NEW 🔥)
    // =========================
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);