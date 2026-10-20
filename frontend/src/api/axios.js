import axios from 'axios';

// In dev, '/api' is proxied to the backend by Vite (see vite.config.js).
// For a static deploy (e.g. GitHub Pages), set VITE_API_URL to the hosted backend's API URL.
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
