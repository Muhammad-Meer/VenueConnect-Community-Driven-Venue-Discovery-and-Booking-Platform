import api from './api'
import { mockUsers, mockAdminStats } from '../data/mockData'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

/**
 * User / admin API service.
 */

export async function getUsers(params = {}) {
  // TODO: GET /api/users
  if (USE_MOCK) {
    await delay(400)
    let list = mockUsers.map(({ password, ...u }) => u)
    if (params.role) {
      list = list.filter((u) => u.role === params.role)
    }
    if (params.q) {
      const q = params.q.toLowerCase()
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q),
      )
    }
    return { success: true, data: list, total: list.length }
  }
  const { data } = await api.get('/users', { params })
  return data
}

export async function getAdminStats() {
  // TODO: GET /api/analytics/admin
  if (USE_MOCK) {
    await delay(350)
    return { success: true, data: mockAdminStats }
  }
  const { data } = await api.get('/analytics/admin')
  return data
}

export async function updateUserRole(id, role) {
  // TODO: PATCH /api/users/:id/role
  if (USE_MOCK) {
    await delay(400)
    return { success: true, data: { id, role } }
  }
  const { data } = await api.patch(`/users/${id}/role`, { role })
  return data
}

export async function deleteUser(id) {
  // TODO: DELETE /api/users/:id
  if (USE_MOCK) {
    await delay(400)
    return { success: true }
  }
  const { data } = await api.delete(`/users/${id}`)
  return data
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
