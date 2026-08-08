import axiosClient from './axiosClient';

export const fetchAdminStats = () => axiosClient.get('/admin/stats').then((r) => r.data.data);
export const fetchUsers = (params) => axiosClient.get('/admin/users', { params }).then((r) => r.data);
export const updateUserRole = (id, role) =>
  axiosClient.patch(`/admin/users/${id}/role`, { role }).then((r) => r.data.data);
export const toggleUserActive = (id) =>
  axiosClient.patch(`/admin/users/${id}/toggle-active`).then((r) => r.data.data);
