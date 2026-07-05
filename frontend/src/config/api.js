const DEFAULT_API_BASE_URL = 'http://localhost:5001';

export const API_BASE_URL = (
  import.meta.env.DEV
    ? DEFAULT_API_BASE_URL
    : (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL)
).replace(/\/$/, '');

export function getApiUrl(path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export default API_BASE_URL;
