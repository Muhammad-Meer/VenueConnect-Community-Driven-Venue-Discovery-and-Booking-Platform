import api from './api'
import { mockVenues, mockReviews } from '../data/mockData'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

/**
 * Venue API service — ready for backend wiring.
 */

export async function getVenues(params = {}) {
  // TODO: GET /api/venues?city=&category=&minCapacity=&sort=
  if (USE_MOCK) {
    await delay(400)
    let list = [...mockVenues].filter((v) => v.isApproved !== false || params.includePending)

    if (params.q) {
      const q = params.q.toLowerCase()
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          v.location?.toLowerCase().includes(q),
      )
    }
    if (params.city) {
      list = list.filter((v) =>
        v.city.toLowerCase().includes(params.city.toLowerCase()),
      )
    }
    if (params.category) {
      list = list.filter(
        (v) => v.category?.toLowerCase() === params.category.toLowerCase(),
      )
    }
    if (params.minCapacity) {
      list = list.filter((v) => v.capacity >= Number(params.minCapacity))
    }
    if (params.maxPrice) {
      list = list.filter((v) => v.price <= Number(params.maxPrice))
    }
    if (params.featured) {
      list = list.filter((v) => v.featured)
    }
    if (params.ownerId) {
      list = list.filter((v) => v.ownerId === params.ownerId)
    }

    switch (params.sort) {
      case 'price_asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      case 'capacity':
        list.sort((a, b) => b.capacity - a.capacity)
        break
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured))
    }

    return { success: true, data: list, total: list.length }
  }

  const { data } = await api.get('/venues', { params })
  return data
}

export async function getVenueById(id) {
  // TODO: GET /api/venues/:id
  if (USE_MOCK) {
    await delay(350)
    const venue = mockVenues.find((v) => v.id === String(id))
    if (!venue) throw new Error('Venue not found')
    const reviews = mockReviews.filter((r) => r.venueId === String(id))
    return { success: true, data: { ...venue, reviews } }
  }

  const { data } = await api.get(`/venues/${id}`)
  return data
}

export async function searchVenues(query) {
  return getVenues({ q: query })
}

export async function createVenue(payload) {
  // TODO: POST /api/venues
  if (USE_MOCK) {
    await delay(600)
    return {
      success: true,
      data: {
        id: String(Date.now()),
        ...payload,
        isApproved: false,
        rating: 0,
        reviewCount: 0,
      },
    }
  }
  const { data } = await api.post('/venues', payload)
  return data
}

export async function updateVenue(id, payload) {
  // TODO: PUT /api/venues/:id
  if (USE_MOCK) {
    await delay(500)
    return { success: true, data: { id, ...payload } }
  }
  const { data } = await api.put(`/venues/${id}`, payload)
  return data
}

export async function deleteVenue(id) {
  // TODO: DELETE /api/venues/:id
  if (USE_MOCK) {
    await delay(400)
    return { success: true }
  }
  const { data } = await api.delete(`/venues/${id}`)
  return data
}

export async function approveVenue(id) {
  // TODO: PATCH /api/venues/:id/approve
  if (USE_MOCK) {
    await delay(400)
    return { success: true, data: { id, isApproved: true } }
  }
  const { data } = await api.patch(`/venues/${id}/approve`)
  return data
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
