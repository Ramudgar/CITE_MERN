const jwt = require('jsonwebtoken');
const User = require('../Models/userModel'); // or { User } depending on your export
const config = require('../Config/config');

const authenticateUser = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    // console.log('Decoded JWT:', decoded); // { id, iat, exp }

    // Quick sanity-check to catch wrong imports early:
    if (!User || typeof User.findById !== 'function') {
      console.error('User model not loaded correctly. Check your exports/imports.');
      return res.status(500).json({ message: 'Server configuration error: User model.' });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    req.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role || 'user',
    };

    next();
  } catch (error) {
    // console.error('Auth error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = { authenticateUser };
