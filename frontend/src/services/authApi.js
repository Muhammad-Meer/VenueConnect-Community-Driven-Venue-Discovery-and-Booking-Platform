import api from './api'
import { mockUsers } from '../data/mockData'
import { normalizeRole } from '../constants/roles'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

/**
 * Auth API service.
 * Swap mock implementations for real endpoints when backend is live.
 */

export async function login(credentials) {
  // TODO: POST /api/auth/login
  if (USE_MOCK) {
    await delay(600)
    const user = mockUsers.find(
      (u) =>
        u.email.toLowerCase() === credentials.email?.toLowerCase() &&
        u.password === credentials.password,
    )
    if (!user) throw new Error('Invalid email or password')
    const { password, ...safeUser } = user
    return {
      success: true,
      token: `mock-token-${user.id}`,
      user: { ...safeUser, role: normalizeRole(safeUser.role) },
    }
  }

  const { data } = await api.post('/auth/login', credentials)
  return data
}

export async function register(userData) {
  // TODO: POST /api/auth/register
  if (USE_MOCK) {
    await delay(700)
    if (mockUsers.some((u) => u.email.toLowerCase() === userData.email?.toLowerCase())) {
      throw new Error('An account with this email already exists')
    }
    const role =
      userData.role === 'owner' || userData.role === 'venue_owner'
        ? 'venue_owner'
        : 'customer'
    const user = {
      id: `u${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role,
      phone: userData.phone || '',
      avatar: null,
      city: userData.city || '',
    }
    return {
      success: true,
      token: `mock-token-${user.id}`,
      user,
    }
  }

  const { data } = await api.post('/auth/register', userData)
  return data
}

export async function getCurrentUser() {
  // TODO: GET /api/auth/me
  if (USE_MOCK) {
    return null
  }
  const { data } = await api.get('/auth/me')
  return data
}

export async function forgotPassword(email) {
  // TODO: POST /api/auth/forgot-password
  if (USE_MOCK) {
    await delay(500)
    return { success: true, message: `Reset link sent to ${email}` }
  }
  const { data } = await api.post('/auth/forgot-password', { email })
  return data
}

export async function updateProfile(payload) {
  // TODO: PUT /api/users/me
  if (USE_MOCK) {
    await delay(500)
    return { success: true, user: payload }
  }
  const { data } = await api.put('/users/me', payload)
  return data
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
