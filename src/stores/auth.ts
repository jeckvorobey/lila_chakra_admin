/**
 * Хранилище аутентификации администратора.
 *
 * Использует JWT + httpOnly cookies для refresh tokens:
 * - Access token хранится в памяти (НЕ localStorage) — защита от XSS
 * - Refresh token хранится в httpOnly cookie (устанавливается backend)
 * - При 401 автоматически пытается обновить access token
 * - При загрузке пытается восстановить сессию через refresh
 */

import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import type { AdminUser, AuthResponse, LoginPayload } from 'src/types/auth.interface';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
    user: null as AdminUser | null,
    isRefreshing: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    /**
     * Авторизация администратора.
     * Backend установит refresh token в httpOnly cookie автоматически.
     */
    async login(payload: LoginPayload) {
      const response = await api.post<AuthResponse>(
        '/admin/login',
        payload,
        { withCredentials: true },
      );

      this.accessToken = response.data.access_token;
      this.user = response.data.admin;

      api.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
    },

    /**
     * Выход — инвалидирует сессию на сервере и удаляет refresh cookie.
     */
    async logout() {
      try {
        await api.post('/admin/logout', {}, { withCredentials: true });
      } catch (err) {
        console.warn('[Admin Auth] Server logout failed:', err);
      }

      this.accessToken = null;
      this.user = null;
      delete api.defaults.headers.common['Authorization'];
    },

    /**
     * Обновить access token используя refresh token из httpOnly cookie.
     * Возвращает true при успехе, false при неудаче.
     */
    async refreshToken(): Promise<boolean> {
      if (this.isRefreshing) return false;

      this.isRefreshing = true;
      try {
        const response = await api.post<AuthResponse>(
          '/admin/refresh',
          {},
          { withCredentials: true },
        );

        this.accessToken = response.data.access_token;
        this.user = response.data.admin;
        api.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;

        return true;
      } catch {
        this.accessToken = null;
        this.user = null;
        delete api.defaults.headers.common['Authorization'];
        return false;
      } finally {
        this.isRefreshing = false;
      }
    },

    /**
     * Попытаться восстановить сессию при загрузке приложения.
     * Использует refresh token из httpOnly cookie.
     */
    async tryRestoreSession(): Promise<boolean> {
      return await this.refreshToken();
    },
  },
});
