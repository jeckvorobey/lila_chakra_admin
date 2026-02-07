/**
 * Axios boot файл для admin панели.
 *
 * Настраивает:
 * - withCredentials: true для отправки httpOnly cookies
 * - Auto-refresh interceptor: при 401 пытается обновить access token
 * - Обработка 403 с Notify
 * - Очередь запросов при одновременном refresh
 */

import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { Notify } from 'quasar';
import { useAuthStore } from 'stores/auth';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Расширяем тип config для поддержки _retry
interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Очередь запросов, ожидающих refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

export default defineBoot(({ app, router }) => {
  const authStore = useAuthStore();

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as RetryConfig;
      const status = error?.response?.status;
      const url = originalRequest?.url || '';

      // Автоматический refresh при 401
      if (
        status === 401 &&
        !originalRequest._retry &&
        !url.includes('/admin/login') &&
        !url.includes('/admin/refresh')
      ) {
        if (isRefreshing) {
          // Ждём завершения текущего refresh
          return new Promise<string | null>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((newToken) => {
            if (newToken && originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            }
            return api(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const success = await authStore.refreshToken();

          if (success) {
            processQueue(null, authStore.accessToken);
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] =
                `Bearer ${authStore.accessToken}`;
            }
            return api(originalRequest);
          } else {
            const refreshError = new Error('Refresh failed');
            processQueue(refreshError, null);
            await router.push('/login');
            return Promise.reject(refreshError);
          }
        } catch (err) {
          const rejectError =
            err instanceof Error ? err : new Error('Refresh error');
          processQueue(rejectError, null);
          await router.push('/login');
          return Promise.reject(rejectError);
        } finally {
          isRefreshing = false;
        }
      }

      // Обработка 403
      if (status === 403) {
        const message =
          (error?.response?.data?.detail as string) || 'Доступ запрещён';
        Notify.create({
          type: 'negative',
          message,
          position: 'top',
          timeout: 5000,
        });
      }

      return Promise.reject(
        error instanceof Error ? error : new Error('Request failed'),
      );
    },
  );

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
