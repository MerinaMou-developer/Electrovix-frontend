/**
 * Backend API base URL.
 * Set REACT_APP_BACKEND_URL in Vercel env vars for deployment.
 * Fallback ensures app works even if env var is missing.
 */
export const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || "https://electrovix-backend.onrender.com";
