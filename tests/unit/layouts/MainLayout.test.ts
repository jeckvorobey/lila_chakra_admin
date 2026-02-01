import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Quasar, QLayout, QHeader, QToolbar, QBtn, QDrawer, QPageContainer, QList, QItemLabel, QToolbarTitle, QItem, QItemSection, QIcon } from 'quasar';
import { createTestingPinia } from '@pinia/testing';
import MainLayout from 'layouts/MainLayout.vue';

// Mock router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock useTheme
vi.mock('src/composables/useTheme', () => ({
  useTheme: () => ({
    toggleTheme: vi.fn(),
    isDark: { value: true }
  })
}));

describe('MainLayout', () => {
  it('renders correctly', () => {
    const wrapper = mount(MainLayout, {
      global: {
        plugins: [Quasar, createTestingPinia({ createSpy: vi.fn })],
        components: { QLayout, QHeader, QToolbar, QBtn, QDrawer, QPageContainer, QList, QItemLabel, QToolbarTitle, QItem, QItemSection, QIcon },
        stubs: { RouterView: { template: '<div id="router-view"></div>' } }
      },
    });

    expect(wrapper.find('#router-view').exists()).toBe(true);
    expect(wrapper.text()).toContain('Lila Chakra Admin');
    expect(wrapper.text()).toContain('Dashboard');
    expect(wrapper.text()).toContain('Users');
  });
});