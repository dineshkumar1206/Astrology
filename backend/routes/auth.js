const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');

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

module.exports = router;
