import axios from 'axios';
import { getAccessToken, refreshAccessToken } from './authServices';

const apiInstance = axios.create({
    baseURL: 'https://sandbox.nomba.com/v1',
    headers: {
      'Content-Type': 'application/json',
      accountId: process.env.NEXT_PUBLIC_NOMBA_ACCOUNT_ID,
    },
  });
  
  // Request interceptor: Attach access token to every request
  apiInstance.interceptors.request.use(
    async (config) => {
      const token = await getAccessToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Response interceptor: Refresh token on 401 error and retry request
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return apiInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  export default apiInstance;