const jwt = require("jsonwebtoken");

// =========================
// 🔐 PROTECT MIDDLEWARE
// =========================
exports.protect = (req, res, next) => {
  let token;

  // ✅ Check Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user
      req.user = decoded;

      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed"
      });
    }
  }

  // ❌ No token
  return res.status(401).json({
    message: "No token, authorization denied"
  });
};


// =========================
// 🔐 ROLE-BASED AUTHORIZATION
// =========================
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {

    // ❌ Not logged in
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }

    // 👑 ADMIN OVERRIDE 🔥
    if (req.user.role === "admin") {
      return next();
    }

    // 🎯 SELECTOR SPECIAL CASE
    if (roles.includes("selector")) {
      if (req.user.role === "coach" && req.user.isSelector === true) {
        return next();
      }
    }

    // ✅ NORMAL ROLE CHECK
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Only ${roles.join(", ")} allowed`
      });
    }

    // ✅ Allowed
    next();
  };
};