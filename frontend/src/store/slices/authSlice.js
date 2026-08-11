import { createSlice } from '@reduxjs/toolkit';
import { getStoredToken, isTokenUsable, clearAuthStorage } from '../../utils/auth';

const isPlaceholder = (value) => {
  return !value || value === 'undefined' || value === 'null' || value === 'Bearer';
};

// Read the token from localStorage, clearing it (and the user) if it is
// missing, malformed, or already expired. A stale token is the #1 cause of
// "Token is not valid" on production: the dashboard looks logged in, but the
// backend refuses every write because the stored token is dead.
const readToken = () => {
  const token = getStoredToken();
  if (!token || !isTokenUsable(token)) {
    clearAuthStorage();
    return null;
  }
  return token;
};

const token = readToken();
const userStr = localStorage.getItem('user');
let user = null;
if (userStr && userStr !== 'undefined' && userStr !== 'null') {
  try {
    user = JSON.parse(userStr);
  } catch {
    user = null;
  }
}

// If there is no usable token there is no user either.
if (!token) {
  user = null;
}

const initialState = {
  token,
  user,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { token: rawToken, user: rawUser } = action.payload || {};
      if (isPlaceholder(rawToken) || !isTokenUsable(String(rawToken).trim())) {
        clearAuthStorage();
        state.token = null;
        state.user = null;
        return;
      }
      const cleanToken = String(rawToken).trim();
      state.loading = false;
      state.token = cleanToken;
      state.user = rawUser || null;
      localStorage.setItem('token', cleanToken);
      if (rawUser) {
        localStorage.setItem('user', JSON.stringify(rawUser));
      } else {
        localStorage.removeItem('user');
      }
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
      clearAuthStorage();
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
