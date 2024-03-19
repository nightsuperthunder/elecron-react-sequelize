import axios from 'axios';
import { ITokenResponse } from '../types/auth.type';

const axiosService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
});

axiosService.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosService.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest.retryAttempted) {
      originalRequest.retryAttempted = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token') || '';

        const { data: tokens } = await axios.post<ITokenResponse>(
          `${process.env.REACT_APP_SERVER_URL}/api/auth/refresh`,
          {
            refreshToken,
          },
        );

        localStorage.setItem('access_token', tokens.accessToken);
        localStorage.setItem('refresh_token', tokens.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

        return axiosService(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        throw refreshError;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosService;
