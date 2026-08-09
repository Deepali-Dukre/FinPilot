import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let pendingRequests = [];

const resolvePending = (error) => {
  pendingRequests.forEach(({ resolve, reject, config }) => {
    if (error) reject(error);
    else resolve(axiosClient(config));
  });
  pendingRequests = [];
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const isAuthRoute = config?.url?.includes('/auth/login') || config?.url?.includes('/auth/refresh');

    if (response?.status !== 401 || isAuthRoute || config._retry) {
      return Promise.reject(error);
    }

    config._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject, config });
      });
    }

    isRefreshing = true;
    try {
      await axiosClient.post('/auth/refresh');
      resolvePending(null);
      return axiosClient(config);
    } catch (refreshError) {
      resolvePending(refreshError);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosClient;
