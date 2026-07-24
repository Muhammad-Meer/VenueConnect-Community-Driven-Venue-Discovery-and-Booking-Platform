import api from '../api/client';

export const reviewApi = {
  create: (payload) => api.post('/reviews', payload),
};

export default reviewApi;
