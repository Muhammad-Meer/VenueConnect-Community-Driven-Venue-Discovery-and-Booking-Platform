import axios from 'axios';
import { config } from '../config';
import { getString, removeItem, setString } from '../utils/storage';

const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((req) => {
  const token = getString(config.tokenKey);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      const url = error.config?.url || '';
      if (!url.includes('/auth/login') && !url.includes('/auth/register')) {
        removeItem(config.tokenKey);
        removeItem(config.userKey);
      }
    }
    return Promise.reject(error);
  }
);

export function setAuthToken(token) {
  if (token) setString(config.tokenKey, token);
  else removeItem(config.tokenKey);
}

export default api;
