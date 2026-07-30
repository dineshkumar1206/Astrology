const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'saraatarot_secret_key_123';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
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
