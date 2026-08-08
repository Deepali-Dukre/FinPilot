import axiosClient from './axiosClient';

export const fetchSummary = () => axiosClient.get('/dashboard/summary').then((r) => r.data.data);
export const fetchTrend = () => axiosClient.get('/dashboard/trend').then((r) => r.data.data);
export const fetchRecentTransactions = () =>
  axiosClient.get('/dashboard/recent-transactions').then((r) => r.data.data);
