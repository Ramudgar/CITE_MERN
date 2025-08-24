const { User } = require("../Models/userModel");

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    // Never send back password
    // const userData = {
    //   id: user._id,
    //   username: user.username,
    //   email: user.email,
    // };

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = { register };
