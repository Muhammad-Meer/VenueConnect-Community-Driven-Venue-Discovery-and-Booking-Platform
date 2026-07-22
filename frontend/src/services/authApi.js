import request from './api'

export const login = (credentials) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

export const register = (userData) =>
  request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  })

export const forgotPassword = (email) =>
  request('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
