import axios from 'axios';
import { API_BASE_URL } from '../config';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';
import { clearAuthStorage, getStoredToken, notifySessionExpired } from '../utils/auth';

// Login pages are the only routes where a 401 must NOT force a redirect
// (otherwise a failed login attempt would reload the page in a loop).
const isAuthRoute = () => {
  if (typeof window === 'undefined') return true;
  const p = window.location.pathname;
  return p === '/admin' || p === '/login';
};

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
});

// Attach the JWT to every request automatically.
// Reads fresh from localStorage so Redux state and storage can never diverge.
// Works for both plain JSON and multipart (FormData) requests — the browser
// sets the multipart boundary for us; we only add the Authorization header.
client.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling:
// - On 401 (missing / expired / invalid token) clear auth state and send the
//   user back to the correct login page so they can sign in again cleanly.
// - Normalize every error into a human-readable message.
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      const role = store.getState().auth.user?.role;
      store.dispatch(logout());
      clearAuthStorage();

      if (typeof window !== 'undefined' && !isAuthRoute()) {
        notifySessionExpired();
        // Admins return to the admin login; customers to the store login.
        window.location.href = role === 'ADMIN' ? '/admin' : '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Normalize any axios error into a safe, displayable message.
export const getErrorMessage = (err, fallback = 'Something went wrong. Please try again.') => {
  if (err?.response?.data?.message && typeof err.response.data.message === 'string') {
    return err.response.data.message;
  }
  if (err?.response?.status === 401) {
    return 'Your session has expired. Please log in again.';
  }
  if (err?.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.';
  }
  if (err?.response?.status >= 500) {
    return 'Server error. Please try again shortly.';
  }
  return fallback;
};

export default client;
