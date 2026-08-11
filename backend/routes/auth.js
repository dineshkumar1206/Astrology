const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const { verifyAnyUser } = require('../middlewares/authMiddleware');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

router.post('/register', authLimiter, authController.register);
router.post('/customer-login', authLimiter, authController.customerLogin);
router.post('/admin-login', authLimiter, authController.adminLogin);
router.post('/google', authLimiter, authController.googleLogin);

// @route   GET api/auth/me
// @desc    Validate the current token and return the authenticated user.
//          Lets the frontend detect stale/invalid tokens on load and prompt
//          a clean re-login instead of failing later on a write request.
router.get('/me', verifyAnyUser, authController.getMe);

module.exports = router;
