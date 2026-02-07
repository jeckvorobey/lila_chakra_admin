/**
 * Тесты для auth store (Admin).
 *
 * Модуль тестирует:
 * - login() сохраняет access token в памяти (не localStorage)
 * - login() вызывает API с withCredentials для httpOnly cookies
 * - logout() очищает токены и вызывает backend
 * - refreshToken() получает новый access token через refresh cookie
 * - tryRestoreSession() пытается восстановить сессию
 * - isAuthenticated getter
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

// Mock axios — используем vi.hoisted() для правильного hoisting
const { mockApi } = vi.hoisted(() => ({
  mockApi: {
    post: vi.fn(),
    get: vi.fn(),
    defaults: {
      headers: {
        common: {} as Record<string, string | undefined>,
      },
      withCredentials: true,
    },
  },
}));

vi.mock('boot/axios', () => ({
  api: mockApi,
}));

import { useAuthStore } from '../auth';

describe('Admin Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    mockApi.defaults.headers.common = {};
  });

  describe('login()', () => {
    it('should save access token in memory', async () => {
      const store = useAuthStore();

      vi.mocked(mockApi.post).mockResolvedValueOnce({
        data: {
          access_token: 'new-access-token',
          admin: {
            id: 1,
            email: 'admin@test.com',
            full_name: 'Test Admin',
            is_active: true,
            created_at: '2025-01-01T00:00:00',
          },
        },
      });

      await store.login({ email: 'admin@test.com', password: 'secure_password' });

      // Проверяем, что токен сохранён в памяти (НЕ в localStorage)
      expect(store.accessToken).toBe('new-access-token');
      expect(store.user?.email).toBe('admin@test.com');
      expect(localStorage.getItem('admin_token')).toBeNull();
    });

    it('should set Authorization header', async () => {
      const store = useAuthStore();

      vi.mocked(mockApi.post).mockResolvedValueOnce({
        data: {
          access_token: 'test-token-123',
          admin: {
            id: 1,
            email: 'admin@test.com',
            full_name: 'Admin',
            is_active: true,
            created_at: '2025-01-01T00:00:00',
          },
        },
      });

      await store.login({ email: 'admin@test.com', password: 'password' });

      expect(mockApi.defaults.headers.common['Authorization']).toBe(
        'Bearer test-token-123',
      );
    });

    it('should call API with withCredentials for cookies', async () => {
      const store = useAuthStore();

      vi.mocked(mockApi.post).mockResolvedValueOnce({
        data: {
          access_token: 'token',
          admin: {
            id: 1,
            email: 'admin@test.com',
            full_name: 'Admin',
            is_active: true,
            created_at: '2025-01-01T00:00:00',
          },
        },
      });

      await store.login({ email: 'admin@test.com', password: 'password' });

      expect(mockApi.post).toHaveBeenCalledWith(
        '/admin/login',
        { email: 'admin@test.com', password: 'password' },
        { withCredentials: true },
      );
    });

    it('should throw error if login fails', async () => {
      const store = useAuthStore();

      vi.mocked(mockApi.post).mockRejectedValueOnce(
        new Error('Invalid credentials'),
      );

      await expect(
        store.login({ email: 'admin@test.com', password: 'wrong' }),
      ).rejects.toThrow('Invalid credentials');

      expect(store.accessToken).toBeNull();
    });
  });

  describe('logout()', () => {
    it('should call backend logout API', async () => {
      const store = useAuthStore();

      store.accessToken = 'test-token';
      store.user = {
        id: 1,
        email: 'admin@test.com',
        full_name: 'Admin',
        is_active: true,
        created_at: '2025-01-01T00:00:00',
      };

      vi.mocked(mockApi.post).mockResolvedValueOnce({
        data: { success: true },
      });

      await store.logout();

      expect(mockApi.post).toHaveBeenCalledWith(
        '/admin/logout',
        {},
        { withCredentials: true },
      );
    });

    it('should clear access token from memory', async () => {
      const store = useAuthStore();

      store.accessToken = 'test-token';
      store.user = {
        id: 1,
        email: 'admin@test.com',
        full_name: 'Admin',
        is_active: true,
        created_at: '2025-01-01T00:00:00',
      };

      vi.mocked(mockApi.post).mockResolvedValueOnce({
        data: { success: true },
      });

      await store.logout();

      expect(store.accessToken).toBeNull();
      expect(store.user).toBeNull();
    });

    it('should remove Authorization header', async () => {
      const store = useAuthStore();

      store.accessToken = 'test-token';
      mockApi.defaults.headers.common['Authorization'] = 'Bearer test-token';

      vi.mocked(mockApi.post).mockResolvedValueOnce({
        data: { success: true },
      });

      await store.logout();

      expect(
        mockApi.defaults.headers.common['Authorization'],
      ).toBeUndefined();
    });

    it('should continue if backend logout fails', async () => {
      const store = useAuthStore();

      store.accessToken = 'test-token';

      vi.mocked(mockApi.post).mockRejectedValueOnce(
        new Error('Network error'),
      );

      await expect(store.logout()).resolves.not.toThrow();

      expect(store.accessToken).toBeNull();
    });
  });

  describe('refreshToken()', () => {
    it('should get new access token from refresh endpoint', async () => {
      const store = useAuthStore();

      vi.mocked(mockApi.post).mockResolvedValueOnce({
        data: {
          access_token: 'new-refreshed-token',
          admin: {
            id: 1,
            email: 'admin@test.com',
            full_name: 'Admin',
            is_active: true,
            created_at: '2025-01-01T00:00:00',
          },
        },
      });

      const result = await store.refreshToken();

      expect(mockApi.post).toHaveBeenCalledWith(
        '/admin/refresh',
        {},
        { withCredentials: true },
      );

      expect(store.accessToken).toBe('new-refreshed-token');
      expect(result).toBe(true);
    });

    it('should update Authorization header with new token', async () => {
      const store = useAuthStore();

      vi.mocked(mockApi.post).mockResolvedValueOnce({
        data: {
          access_token: 'refreshed-123',
          admin: {
            id: 1,
            email: 'admin@test.com',
            full_name: 'Admin',
            is_active: true,
            created_at: '2025-01-01T00:00:00',
          },
        },
      });

      await store.refreshToken();

      expect(mockApi.defaults.headers.common['Authorization']).toBe(
        'Bearer refreshed-123',
      );
    });

    it('should return false and clear state if refresh fails', async () => {
      const store = useAuthStore();

      store.accessToken = 'old-token';

      vi.mocked(mockApi.post).mockRejectedValueOnce(
        new Error('Refresh token expired'),
      );

      const result = await store.refreshToken();

      expect(result).toBe(false);
      expect(store.accessToken).toBeNull();
    });

    it('should prevent concurrent refresh attempts', async () => {
      const store = useAuthStore();

      vi.mocked(mockApi.post).mockResolvedValue({
        data: {
          access_token: 'refreshed-token',
          admin: {
            id: 1,
            email: 'admin@test.com',
            full_name: 'Admin',
            is_active: true,
            created_at: '2025-01-01T00:00:00',
          },
        },
      });

      // Запускаем два refresh одновременно
      const promise1 = store.refreshToken();
      const promise2 = store.refreshToken();

      await Promise.all([promise1, promise2]);

      // API должен быть вызван только один раз
      expect(mockApi.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('tryRestoreSession()', () => {
    it('should call refreshToken to restore session', async () => {
      const store = useAuthStore();

      vi.mocked(mockApi.post).mockResolvedValueOnce({
        data: {
          access_token: 'restored-token',
          admin: {
            id: 1,
            email: 'admin@test.com',
            full_name: 'Admin',
            is_active: true,
            created_at: '2025-01-01T00:00:00',
          },
        },
      });

      const result = await store.tryRestoreSession();

      expect(result).toBe(true);
      expect(store.accessToken).toBe('restored-token');
    });

    it('should return false if no refresh token available', async () => {
      const store = useAuthStore();

      vi.mocked(mockApi.post).mockRejectedValueOnce(
        new Error('No refresh token'),
      );

      const result = await store.tryRestoreSession();

      expect(result).toBe(false);
      expect(store.accessToken).toBeNull();
    });
  });

  describe('isAuthenticated getter', () => {
    it('should return true when accessToken exists', () => {
      const store = useAuthStore();
      store.accessToken = 'test-token';
      expect(store.isAuthenticated).toBe(true);
    });

    it('should return false when accessToken is null', () => {
      const store = useAuthStore();
      store.accessToken = null;
      expect(store.isAuthenticated).toBe(false);
    });
  });
});
