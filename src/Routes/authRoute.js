const express = require("express");
const { register } = require("../Controllers/authController");
const router = express.Router();

// Route for user registration
router.post("/register", register);

module.exports = router;
