import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';





// --- 1. CONFIGURATION ---
const API_BASE_URL =
  process.env.NEXT_PUBLIC_APP_BASE_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:10000' : undefined);

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined. Set NEXT_PUBLIC_APP_BASE_URL in your env.');
}

// 2. CREATE THE AXIOS INSTANCE
const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}`, 
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;