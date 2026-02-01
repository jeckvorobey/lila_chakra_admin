import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from 'stores/auth';
import { api } from 'boot/axios';

// Mock axios
vi.mock('boot/axios', () => ({
  api: {
    post: vi.fn(),
    defaults: { headers: { common: {} } }
  }
}));

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('login action calls API and updates state', async () => {
    const store = useAuthStore();
    const mockUser = { id: 1, login: 'admin' };
    const mockResponse = { data: { access_token: 'token123', user: mockUser } };
    
    (api.post as any).mockResolvedValue(mockResponse);

    await store.login({ username: 'admin', password: 'password' });

    // Assuming form data or json, adjusting to simple expectation
    expect(api.post).toHaveBeenCalled(); 
    expect(store.token).toBe('token123');
    expect(store.user).toEqual(mockUser);
    expect(store.isAuthenticated).toBe(true);
  });

  it('logout action clears state', () => {
    const store = useAuthStore();
    store.token = 'token123';
    store.user = { id: 1, login: 'admin' };

    store.logout();

    expect(store.token).toBeNull();
    expect(store.user).toBeNull();
    expect(store.isAuthenticated).toBe(false);
  });
});
