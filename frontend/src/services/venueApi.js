import request from './api'

export const getVenues = (params = {}) => {
  const query = new URLSearchParams(params).toString()
  return request(`/venues${query ? `?${query}` : ''}`)
}

export const getVenueById = (id) => request(`/venues/${id}`)

export const searchVenues = (query) =>
  request(`/venues/search?q=${encodeURIComponent(query)}`)
