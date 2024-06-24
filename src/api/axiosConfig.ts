import axios from 'axios';
import { useUserCookies } from '@/context/UserCookiesContext';
import { useEffect } from 'react';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const useAxiosConfig = () => {
  const { getAccessToken, getRefreshToken, saveAccessToken, removeSession } = useUserCookies();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response ? error.response.status : null;
        if (status === 401) {
          // Intenta renovar el token de acceso
          try {
            const newAccessToken = await renewAccessToken();
            error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return api.request(error.config);
          } catch (refreshError) {
            // Maneja errores de renovación
            removeSession(); // Elimina la sesión
            console.error('Error al renovar el token:', refreshError);
            // Puedes redirigir al usuario a la página de inicio de sesión aquí
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [getAccessToken, getRefreshToken, saveAccessToken, removeSession]);

  const renewAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    try {
      const response = await api.post('/token/refresh/', { refresh: refreshToken });
      const newAccessToken = response.data.access;
      saveAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      throw new Error('Failed to renew access token');
    }
  };
};