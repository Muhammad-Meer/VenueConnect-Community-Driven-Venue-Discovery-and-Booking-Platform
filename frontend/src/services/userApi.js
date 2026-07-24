import api from '../api/client';

export const userApi = {
  profile: () => api.get('/users/profile'),
  updateProfile: (payload) => api.put('/users/profile', payload),
  allUsers: () => api.get('/users/all'),
};

export default userApi;
