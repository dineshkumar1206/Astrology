const isLocal = typeof window !== "undefined" && 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

// Determine the live URL dynamically or use the amigowebster.in fallback
const getLiveURL = () => {
  // 1. Prefer environment variable if it exists
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // 2. Dynamic client-side routing
  if (typeof window !== "undefined") {
    // If we're on the staging domain, use the hardcoded staging path
    if (window.location.hostname.includes("amigowebster.in")) {
      return "https://amigowebster.in/astrology";
    }
    // Dynamic fallback for custom domains (e.g., if you move to www.saraatarot.com)
    return window.location.origin + "/astrology"; 
  }
  
  // 3. Absolute fallback
  return "https://amigowebster.in/astrology";
};

// Export as API_BASE_URL to match your current project's naming convention
export const API_BASE_URL = isLocal 
  ? "http://localhost:5001" // Ensure this port matches your local Node.js server port
  : getLiveURL();

export default API_BASE_URL;