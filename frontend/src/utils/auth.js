// Shared, dependency-free token helpers used by BOTH the axios API client and
// the Redux auth store. Keeping them in one module guarantees the two layers
// can never disagree about what a valid token looks like.

// Remove the token and user from localStorage.
export const clearAuthStorage = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch {
    // storage may be unavailable (private mode / cross-origin iframe)
  }
};

// Read a safe, trimmed bearer token from localStorage.
export const getStoredToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null' || token === 'Bearer') return null;
    return token.trim();
  } catch {
    return null;
  }
};

// Flag that the last session ended with a 401 so the login page can greet the
// user with a "session expired, please sign in again" notice.
export const notifySessionExpired = () => {
  try {
    sessionStorage.setItem('sara_auth_expired', '1');
  } catch {
    // ignore
  }
};

// Decode the payload of a JWT without verifying its signature.
// Returns null when the token is malformed (wrong segment count / bad base64).
export const decodeJwtPayload = (token) => {
  if (!token || typeof token !== 'string') return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

// True when a token is malformed or past its `exp` claim.
export const isTokenUsable = (token) => {
  const payload = decodeJwtPayload(token);
  if (!payload) return false;
  if (typeof payload.exp === 'number') {
    return payload.exp * 1000 > Date.now();
  }
  return true; // no exp claim — accept defensively
};
