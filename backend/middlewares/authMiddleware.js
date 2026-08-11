const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

// Extract the bearer token from the Authorization header.
// Handles "Bearer <token>", bare tokens, and common proxy mangling.
const extractToken = (req) => {
  const authHeader = req.headers['authorization'] || req.headers['x-auth-token'] || '';
  const parts = String(authHeader).trim().split(/\s+/);
  if (parts.length >= 2 && /^bearer$/i.test(parts[0])) {
    return parts.slice(1).join(' ');
  }
  if (parts.length === 1 && parts[0]) {
    return parts[0];
  }
  return null;
};

const isPlaceholder = (token) => {
  return !token || token === 'undefined' || token === 'null' || token === 'Bearer' || token === '';
};

const verifyToken = (req, res, next) => {
  const token = extractToken(req);

  if (isPlaceholder(token)) {
    return res.status(401).json({ code: 'TOKEN_MISSING', message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ code: 'TOKEN_EXPIRED', message: 'Session expired. Please log in again.' });
    }
    // A signature failure almost always means the JWT_SECRET used to sign the
    // token is different from the one used here (changed .env, quotes around
    // the secret, or multiple instances with different configs).
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.error(
        'JWT signature verification failed. Check that JWT_SECRET is identical across deployments ' +
        'and that the .env value has no surrounding quotes or whitespace.'
      );
    } else {
      // Log the actual error server-side so the real cause is visible in prod logs.
      console.error('JWT verification failed:', err.name, err.message);
    }
    return res.status(401).json({ code: 'TOKEN_INVALID', message: 'Token is not valid. Please sign in again.' });
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Administrator privileges required.' });
    }
    next();
  });
};

const verifyAnyUser = (req, res, next) => {
  verifyToken(req, res, next);
};

module.exports = {
  verifyAdmin,
  verifyAnyUser
};
