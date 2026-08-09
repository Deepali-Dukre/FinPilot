import axiosClient from './axiosClient';

export const fetchTransactions = (params) =>
  axiosClient.get('/transactions', { params }).then((r) => r.data);
export const createTransaction = (payload) =>
  axiosClient.post('/transactions', payload).then((r) => r.data.data);
export const updateTransaction = (id, payload) =>
  axiosClient.put(`/transactions/${id}`, payload).then((r) => r.data.data);
export const deleteTransaction = (id) =>
  axiosClient.delete(`/transactions/${id}`).then((r) => r.data);
