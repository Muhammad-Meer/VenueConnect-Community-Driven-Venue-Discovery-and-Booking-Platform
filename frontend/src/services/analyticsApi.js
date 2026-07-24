import api from '../api/client';

export const analyticsApi = {
  owner: (params) => api.get('/analytics/owner', { params }),
  admin: (params) => api.get('/analytics/admin', { params }),
};

export default analyticsApi;
