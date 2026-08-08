import axiosClient from './axiosClient';

export const fetchCategories = (type) =>
  axiosClient.get('/categories', { params: type ? { type } : {} }).then((r) => r.data.data);
export const createCategory = (payload) =>
  axiosClient.post('/categories', payload).then((r) => r.data.data);
export const deleteCategory = (id) => axiosClient.delete(`/categories/${id}`).then((r) => r.data);
