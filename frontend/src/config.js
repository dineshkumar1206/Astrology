const isLocal = typeof window !== "undefined" && 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

// The live backend is hosted on cPanel under the /astrology subfolder.
// This MUST be a stable, absolute URL — do NOT build it from window.location
// because the frontend may be served from a different origin (e.g. Vercel),
// which would make every API call hit the wrong host.
const LIVE_API_URL = "https://amigowebster.in/astrology";

// Determine the live URL dynamically or use the amigowebster.in fallback
const getLiveURL = () => {
  // 1. Prefer environment variable if it exists (set VITE_API_URL in Vercel/cPanel build settings)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }

  // 2. If we're on the staging/backend domain, use the same subfolder backend
  if (typeof window !== "undefined" && window.location.hostname.includes("amigowebster.in")) {
    return LIVE_API_URL;
  }

  // 3. Any other origin (Vercel, custom domain) still points at the real backend
  return LIVE_API_URL;
};

// Export as API_BASE_URL to match your current project's naming convention
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const API_BASE_URL = isLocal 
  ? "http://localhost:5001" // Ensure this port matches your local Node.js server port
  : getLiveURL();

export default API_BASE_URL;
