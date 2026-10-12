import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/search', protect, async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !String(q).trim()) {
      return res.status(200).json({ success: true, users: [] });
    }

    const searchTerm = String(q).trim();
    const users = await User.find({
      _id: { $ne: req.user._id },
      $or: [
        { username: { $regex: searchTerm, $options: 'i' } },
        { fullName: { $regex: searchTerm, $options: 'i' } }
      ]
    })
      .select('_id fullName username avatar bio')
      .limit(10);

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to search users.' });
  }
});

router.get('/profile/:username', protect, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username.toLowerCase() }).select(
      '-password'
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to load profile.' });
  }
});

export default router;
