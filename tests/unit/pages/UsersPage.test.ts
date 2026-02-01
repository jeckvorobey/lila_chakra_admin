import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Quasar, QPage, QTable, QCard } from 'quasar';
import { createTestingPinia } from '@pinia/testing';
import UsersPage from 'pages/UsersPage.vue';
import { useUsersStore } from 'stores/users';

describe('UsersPage', () => {
  it('renders table and fetches data', () => {
    const wrapper = mount(UsersPage, {
      global: {
        plugins: [Quasar, createTestingPinia({ createSpy: vi.fn, stubActions: true })],
        stubs: { 
            QPage: { template: '<div><slot /></div>' },
            QTable: true 
        },
        components: { QPage, QTable, QCard }
      },
    });

    const store = useUsersStore();
    expect(store.fetchUsers).toHaveBeenCalled();
    expect(wrapper.findComponent(QTable).exists()).toBe(true);
  });
});
