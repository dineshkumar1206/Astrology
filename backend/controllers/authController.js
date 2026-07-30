const jwt = require('jsonwebtoken');
const User = require('../models/User');
const LoginHistory = require('../models/LoginHistory');

const JWT_SECRET = process.env.JWT_SECRET || 'saraatarot_secret_key_123';

const signToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const getClientIp = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || req.connection?.remoteAddress || null;
};

const getClientUserAgent = (req) => {
  return req.headers['user-agent'] || null;
};

const recordLogin = async (userId, method, req) => {
  try {
    await LoginHistory.create({
      userId,
      loginMethod: method,
      ipAddress: getClientIp(req),
      userAgent: getClientUserAgent(req)
    });
  } catch (err) {
    console.error('Failed to record login history:', err);
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  try {
    const existing = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existing) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'CUSTOMER'
    });

    await recordLogin(user.id, 'email', req);

    const token = signToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const customerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (user.role !== 'CUSTOMER') {
      return res.status(403).json({ message: 'This account is not a customer account. Please use the admin login.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    await recordLogin(user.id, 'email', req);

    const token = signToken(user);

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Customer login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    await recordLogin(user.id, 'email', req);

    const token = signToken(user);

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Admin login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const googleLogin = async (req, res) => {
  const { credential, accessToken } = req.body;

  if (!credential && !accessToken) {
    return res.status(400).json({ message: 'Google credential or access token is required' });
  }

  try {
    let googlePayload;
    if (credential) {
      try {
        const resp = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        googlePayload = await resp.json();
        if (!resp.ok || googlePayload.error) {
          return res.status(401).json({ message: 'Invalid Google credential' });
        }
      } catch (fetchErr) {
        console.error('Google token verification failed:', fetchErr);
        return res.status(401).json({ message: 'Google token verification failed' });
      }
    } else {
      try {
        const resp = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        googlePayload = await resp.json();
        if (!resp.ok || googlePayload.error) {
          return res.status(401).json({ message: 'Invalid Google access token' });
        }
      } catch (fetchErr) {
        console.error('Google userinfo fetch failed:', fetchErr);
        return res.status(401).json({ message: 'Google userinfo fetch failed' });
      }
    }

    const { sub: googleId, email, name } = googlePayload;

    let user = await User.findOne({ where: { googleId } });
    let isNewUser = false;
    if (!user) {
      user = await User.findOne({ where: { email: email.toLowerCase() } });
      if (user) {
        user.googleId = googleId;
        await user.save();
      } else {
        user = await User.create({
          name: name || email.split('@')[0],
          email: email.toLowerCase(),
          googleId,
          role: 'CUSTOMER',
          password: null
        });
        isNewUser = true;
      }
    }

    await recordLogin(user.id, 'google', req);

    const token = signToken(user);

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Google login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  customerLogin,
  adminLogin,
  googleLogin
};
