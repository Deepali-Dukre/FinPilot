import axiosClient from './axiosClient';

export const registerUser = (payload) => axiosClient.post('/auth/register', payload).then((r) => r.data.data);
export const loginUser = (payload) => axiosClient.post('/auth/login', payload).then((r) => r.data.data);
export const logoutUser = () => axiosClient.post('/auth/logout').then((r) => r.data.data);
export const fetchMe = () => axiosClient.get('/auth/me').then((r) => r.data.data);
export const forgotPassword = (email) =>
  axiosClient.post('/auth/forgot-password', { email }).then((r) => r.data);
export const resetPassword = (token, password) =>
  axiosClient.post(`/auth/reset-password/${token}`, { password }).then((r) => r.data);
