import api from '../api/client';

export const bookingApi = {
  create: (payload) => api.post('/bookings', payload),
  myBookings: () => api.get('/bookings/my'),
  ownerBookings: () => api.get('/bookings/owner'),
};

export default bookingApi;
