/**
 * Resolves asset URLs relative to the Vite base URL.
 * Converts absolute paths (starting with "/") to use the configured BASE_URL.
 */
export function resolveAssetUrl(url: string): string {
  if (url?.startsWith("/")) return import.meta.env.BASE_URL + url.slice(1);
  return url || "";
}
