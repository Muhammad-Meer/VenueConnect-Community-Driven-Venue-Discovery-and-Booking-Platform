import api from '../api/client';

export const paymentApi = {
  create: (payload) => api.post('/payments', payload),
};

export default paymentApi;
