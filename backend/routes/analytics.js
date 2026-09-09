const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { verifyAnyUser } = require('../middlewares/authMiddleware'); // For protected routes

// Route to record a new site visit (public)
router.post('/track-visit', analyticsController.trackVisit);

// Route to get dashboard overview data (protected - admin only ideally, but verifyAnyUser for now)
router.get('/overview', verifyAnyUser, analyticsController.getOverview);

module.exports = router;
