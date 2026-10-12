import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const sanitizeUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  username: user.username,
  email: user.email,
  avatar: user.avatar,
  bio: user.bio,
  isOnline: user.isOnline,
  lastSeen: user.lastSeen,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '7d'
  });

export const registerUser = async (req, res) => {
  try {
    const { fullName, username, email, password, bio, avatar } = req.body;

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Full name, username, email, and password are required.'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.'
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }]
    });

    if (existingUser) {
      const conflictMessage =
        existingUser.email === email.toLowerCase() ? 'Email is already in use.' : 'Username is already taken.';

      return res.status(409).json({
        success: false,
        message: conflictMessage
      });
    }

    const newUser = await User.create({
      fullName,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      bio: bio || '',
      avatar: avatar || ''
    });

    const token = generateToken(newUser._id);

    return res.status(201).json({
      success: true,
      token,
      user: sanitizeUser(newUser)
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to create account.'
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      token,
      user: sanitizeUser(user)
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to authenticate user.'
    });
  }
};

export const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: sanitizeUser(req.user)
  });
};

export const logoutUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.'
  });
};
