import { API_BASE_URL } from "../config";

let warmupStarted = false;

/**
 * Wake Render free tier while the React bundle loads (non-blocking).
 */
export function warmBackend() {
  if (warmupStarted) return;
  warmupStarted = true;

  const url = `${API_BASE_URL}/api/health/`;
  fetch(url, { mode: "cors", credentials: "omit" }).catch(() => {});
}
