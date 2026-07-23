import api from './api'
import { mockBookings, mockEarnings } from '../data/mockData'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

/**
 * Booking API service — ready for backend wiring.
 */

export async function getBookings(params = {}) {
  // TODO: GET /api/bookings
  if (USE_MOCK) {
    await delay(400)
    let list = [...mockBookings]
    if (params.customerId) {
      list = list.filter((b) => b.customerId === params.customerId)
    }
    if (params.ownerId) {
      list = list.filter((b) => b.ownerId === params.ownerId)
    }
    if (params.status) {
      list = list.filter((b) => b.status === params.status)
    }
    return { success: true, data: list, total: list.length }
  }

  const { data } = await api.get('/bookings', { params })
  return data
}

export async function getBookingById(id) {
  // TODO: GET /api/bookings/:id
  if (USE_MOCK) {
    await delay(300)
    const booking = mockBookings.find((b) => b.id === String(id))
    if (!booking) throw new Error('Booking not found')
    return { success: true, data: booking }
  }
  const { data } = await api.get(`/bookings/${id}`)
  return data
}

export async function createBooking(bookingData) {
  // TODO: POST /api/bookings
  if (USE_MOCK) {
    await delay(700)
    return {
      success: true,
      data: {
        id: `b${Date.now()}`,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
        ...bookingData,
      },
    }
  }
  const { data } = await api.post('/bookings', bookingData)
  return data
}

export async function cancelBooking(id) {
  // TODO: PATCH /api/bookings/:id/cancel  or DELETE
  if (USE_MOCK) {
    await delay(400)
    return { success: true, data: { id, status: 'cancelled' } }
  }
  const { data } = await api.delete(`/bookings/${id}`)
  return data
}

export async function updateBookingStatus(id, status) {
  // TODO: PATCH /api/bookings/:id/status
  if (USE_MOCK) {
    await delay(400)
    return { success: true, data: { id, status } }
  }
  const { data } = await api.patch(`/bookings/${id}/status`, { status })
  return data
}

export async function getOwnerEarnings() {
  // TODO: GET /api/analytics/earnings
  if (USE_MOCK) {
    await delay(400)
    return { success: true, data: mockEarnings }
  }
  const { data } = await api.get('/analytics/earnings')
  return data
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
