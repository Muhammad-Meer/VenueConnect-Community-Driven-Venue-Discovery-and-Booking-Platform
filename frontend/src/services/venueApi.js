import api from '../api/client';

export const venueApi = {
  list: (params) => api.get('/venues', { params }),
  getById: (id) => api.get(`/venues/${id}`),
  create: (payload) => api.post('/venues', payload),
  update: (id, payload) => api.put(`/venues/${id}`, payload),
};

export default venueApi;
