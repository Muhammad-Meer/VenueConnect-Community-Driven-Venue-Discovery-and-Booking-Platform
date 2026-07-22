import request from './api'

export const createBooking = (bookingData) =>
  request('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  })

export const getBookings = () => request('/bookings')

export const getBookingById = (id) => request(`/bookings/${id}`)

export const cancelBooking = (id) =>
  request(`/bookings/${id}`, {
    method: 'DELETE',
  })
