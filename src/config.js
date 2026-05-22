/**
 * Backend API base URL.
 * Set REACT_APP_BACKEND_URL in Vercel env vars for deployment.
 */
export const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || "https://electrovix-backend.onrender.com";

/** Google OAuth Web Client ID (same as backend GOOGLE_OAUTH_CLIENT_ID) */
export const GOOGLE_CLIENT_ID = (
  process.env.REACT_APP_GOOGLE_CLIENT_ID || ""
).trim();

/**
 * Product image URL — supports relative paths (/images/...) and full Cloudinary URLs.
 */
export function getProductImageUrl(image) {
  if (!image) {
    return `${API_BASE_URL}/images/placeholder.png`;
  }
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  const path = image.startsWith("/") ? image : `/${image}`;
  return `${API_BASE_URL}${path}`;
}
