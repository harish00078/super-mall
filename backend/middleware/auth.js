const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("./logger");

// Protect routes - authentication required
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      logger.warn("Access attempt without token");
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        logger.warn(`Token valid but user not found: ${decoded.id}`);
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      logger.info(`User authenticated: ${req.user.email}`);
      next();
    } catch (err) {
      logger.error(`Token verification failed: ${err.message}`);
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }
  } catch (error) {
    logger.error(`Auth middleware error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Restrict to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      logger.warn(`Unauthorized access attempt by ${req.user.email} - Required roles: ${roles.join(", ")}`);
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};
