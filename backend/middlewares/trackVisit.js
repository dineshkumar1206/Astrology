const SiteVisit = require('../models/SiteVisit');

const trackVisit = async (req, res, next) => {
  try {
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || req.connection?.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;
    const endpoint = req.originalUrl || req.url;

    // Optional: avoid tracking multiple requests from same IP within a small window if you want unique visits,
    // or just track everything and group by IP/Date in the analytics query. We will track everything and group later.
    
    // We only care about tracking root or main frontend routes, but since frontend and backend are separate,
    // we can track the main API requests or create a specific endpoint for the frontend to hit to record a visit.
    // Given the architecture, let's just log it.
    
    await SiteVisit.create({
      ipAddress,
      userAgent,
      endpoint
    });
  } catch (err) {
    console.error('Error tracking visit:', err);
  }
  next();
};

module.exports = trackVisit;
