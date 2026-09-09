const LoginHistory = require('../models/LoginHistory');
const User = require('../models/User');
const SiteVisit = require('../models/SiteVisit');
const { Sequelize } = require('sequelize');

// Fetch overview data for the dashboard
const getOverview = async (req, res) => {
  try {
    // 1. Get total unique site visitors (count distinct IPs)
    const uniqueVisitorsCount = await SiteVisit.count({
      distinct: true,
      col: 'ipAddress'
    });

    // 2. Get total unique logins (count distinct users who have logged in)
    const uniqueLoginsCount = await LoginHistory.count({
      distinct: true,
      col: 'userId'
    });

    // 3. Get recent logins with user details
    const recentLogins = await LoginHistory.findAll({
      limit: 100,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: ['name', 'email']
      }]
    });

    // 4. Get logins grouped by date
    const loginsByDate = await LoginHistory.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'DESC']],
      limit: 14 // last 14 days
    });

    return res.json({
      uniqueVisitors: uniqueVisitorsCount,
      uniqueLogins: uniqueLoginsCount,
      recentLogins: recentLogins,
      loginsByDate: loginsByDate
    });
  } catch (err) {
    console.error('Error fetching analytics overview:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Record a new site visit (called from frontend on load)
const trackVisit = async (req, res) => {
  try {
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || req.connection?.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    await SiteVisit.create({
      ipAddress,
      userAgent,
      endpoint: '/frontend-load'
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error tracking visit:', err);
    // Don't fail the request if tracking fails
    return res.status(200).json({ success: false });
  }
};

module.exports = {
  getOverview,
  trackVisit
};
