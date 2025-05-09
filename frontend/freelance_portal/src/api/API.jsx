import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 30000,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('401 Unauthorized:', error.response?.data?.message);
    }
    return Promise.reject(error);
  }
);

export const userAPI = {
  signup: (credentials) => API.post('/api/auth/register', credentials),
  login: (credentials) => API.post('/api/auth/login', credentials),
  logout: () => API.post('/api/auth/logout'),
  status: () => API.get('/api/auth/status'),
  verifySecurityCode: (payload) => API.post('/api/auth/verify-security-code', payload),
  requestResetCode: (payload) => API.post('/api/auth/generate-security-code', payload),
  resetPassword: (payload) => API.post('/api/auth/reset-password', payload),
  refreshAccessToken: () => API.post('/api/auth/refresh-token'),
};

export default API;