import axios, { AxiosInstance } from 'axios';
// new updates 
// --- 1. CONFIGURATION ---
const API_BASE_URL =
  process.env.NEXT_PUBLIC_APP_BASE_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:10000/api' : undefined);

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined. Set NEXT_PUBLIC_APP_BASE_URL in your env.');
}

// 2. CREATE THE AXIOS INSTANCE
const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json', // Ensure the correct content type is set
  },
  // No need for `withCredentials` since you're not using credentials (cookies, tokens)
});

export default api;
