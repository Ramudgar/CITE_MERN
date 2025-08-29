const jwt = require("jsonwebtoken");
const User  = require("../Models/userModel");
const config = require("../Config/config");

const authenticateUser = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // Remove Bearer prefix if present
    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    // console.log("Decoded JWT:", decoded);

    // Fetch user from DB
    const user = await User.findOne({ _id: decoded.id }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Attach user to request
    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role || "user", // default role if not stored
    };

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = { authenticateUser };
