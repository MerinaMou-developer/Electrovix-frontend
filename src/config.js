/**
 * Backend API base URL.
 * Set REACT_APP_BACKEND_URL in Vercel env vars for deployment.
 */
export const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || "https://electrovix-backend.onrender.com";

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
