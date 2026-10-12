import express from 'express';
import rateLimit from 'express-rate-limit';
import { registerUser, loginUser, getCurrentUser, logoutUser } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.'
  }
});

router.post('/signup', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.get('/me', protect, getCurrentUser);
router.post('/logout', protect, logoutUser);

export default router;
