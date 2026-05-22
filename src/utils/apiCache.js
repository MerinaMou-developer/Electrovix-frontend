const DEFAULT_TTL_MS = 5 * 60 * 1000;

export function readCache(key, ttlMs = DEFAULT_TTL_MS) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { savedAt, data } = JSON.parse(raw);
    if (Date.now() - savedAt > ttlMs) {
      sessionStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function writeCache(key, data) {
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({ savedAt: Date.now(), data })
    );
  } catch {
    /* quota exceeded — ignore */
  }
}

export function cacheKey(path, query = "") {
  return `electrovix:${path}${query}`;
}
