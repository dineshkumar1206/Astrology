const path = require('path');
const crypto = require('crypto');

// Ensure .env is loaded regardless of the current working directory
// (cPanel / PM2 / systemd may start the app from a different folder).
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Normalize a raw secret value: trim whitespace and strip one layer of
// wrapping quotes. cPanel .env editors often save `JWT_SECRET="mysecret"`
// with the quotes included — dotenv keeps them verbatim, which silently
// produces a DIFFERENT secret and makes every previously-issued token fail
// with "Token is not valid".
const sanitizeSecret = (value) => {
  if (!value || typeof value !== 'string') return '';
  let s = value.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s;
};

// Single source of truth for JWT configuration.
// This secret is used BOTH to sign tokens (login) and to verify tokens
// (auth middleware). If these ever diverge, every authenticated request
// returns "Token is not valid". Set JWT_SECRET in your production .env and
// NEVER change it while admins have active sessions.
const JWT_SECRET = sanitizeSecret(process.env.JWT_SECRET) || 'saraatarot_secret_key_123';
const JWT_EXPIRES_IN = sanitizeSecret(process.env.JWT_EXPIRES_IN) || '7d';

// Print a safe fingerprint + flag the default so a secret mismatch between
// deployments (or a missed .env) is visible immediately in server logs.
const isDefault = !process.env.JWT_SECRET;
const fingerprint = crypto.createHash('sha256').update(JWT_SECRET).digest('hex').slice(0, 12);
console.log(
  `[JWT] secret fingerprint ${fingerprint} (${isDefault ? 'DEFAULT FALLBACK - set JWT_SECRET in .env' : 'from environment'})`
);

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN
};
