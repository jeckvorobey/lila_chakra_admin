/**
 * Базовые тесты для Auth Store (admin).
 *
 * Полные тесты находятся в src/stores/__tests__/auth.spec.ts
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

const { mockApi } = vi.hoisted(() => ({
  mockApi: {
    post: vi.fn(),
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

import { useAuthStore } from 'stores/auth';

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    mockApi.defaults.headers.common = {};
  });

  it('login action calls API and updates state', async () => {
    const store = useAuthStore();
    const mockAdmin = {
      id: 1,
      email: 'admin@test.com',
      full_name: 'Admin',
      is_active: true,
      created_at: '2025-01-01T00:00:00',
    };
    const mockResponse = {
      data: { access_token: 'token123', admin: mockAdmin },
    };

    vi.mocked(mockApi.post).mockResolvedValue(mockResponse);

    await store.login({ email: 'admin@test.com', password: 'password' });

    expect(mockApi.post).toHaveBeenCalled();
    expect(store.accessToken).toBe('token123');
    expect(store.user).toEqual(mockAdmin);
    expect(store.isAuthenticated).toBe(true);
  });

  it('logout action clears state', async () => {
    const store = useAuthStore();
    store.accessToken = 'token123';
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
    expect(store.isAuthenticated).toBe(false);
  });
});
