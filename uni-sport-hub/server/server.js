const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Routes
const authRoutes = require("./modules/auth/authRoutes");
const protectedRoutes = require("./modules/auth/protectedRoutes");
const approvalRoutes = require("./modules/approval/approvalRoutes");

// DB
const connectDB = require("./config/db");

const app = express();

// =========================
// CONNECT DATABASE
// =========================
connectDB();

// =========================
// MIDDLEWARE
// =========================
app.use(cors());
app.use(express.json());

// =========================
// ROUTES
// =========================
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/approval", approvalRoutes);

// =========================
// ROOT ROUTE
// =========================
app.get("/", (req, res) => {
  res.send("🚀 Uni Sport Hub backend is running");
});

// =========================
// SERVER START
// =========================
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🔥 Server is running on port ${PORT}`);
});