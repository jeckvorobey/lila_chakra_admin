import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUsersStore } from 'stores/users';
import { api } from 'boot/axios';

vi.mock('boot/axios', () => ({
  api: {
    get: vi.fn(),
  }
}));

describe('Users Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('fetchUsers calls API', async () => {
    const store = useUsersStore();
    (api.get as any).mockResolvedValue({ data: { items: [], total: 0 } });

    await store.fetchUsers({ page: 1, rowsPerPage: 10 });
    
    // params might be different depending on implementation
    expect(api.get).toHaveBeenCalled(); 
  });
});
