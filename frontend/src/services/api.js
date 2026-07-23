import axios from 'axios'
import { getToken, clearAuthStorage } from '../utils/storage'

/**
 * Axios instance configured for the Venue Booking backend.
 * Base URL can be overridden with VITE_API_URL.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Attach JWT on every request when available
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Normalize errors and handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Session expired — clear local auth (caller may redirect)
      clearAuthStorage()
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.'

    return Promise.reject(new Error(message))
  },
)

export default api
