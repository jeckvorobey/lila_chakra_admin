import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { Quasar, QInput, QBtn, QForm, QCard, QCardSection } from 'quasar';
import { createTestingPinia } from '@pinia/testing';
import LoginPage from 'pages/LoginPage.vue';
import { useAuthStore } from 'stores/auth';

// Mock router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('LoginPage', () => {
  it('renders login form', () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [Quasar, createTestingPinia({ createSpy: vi.fn })],
        stubs: { QPage: { template: '<div><slot /></div>' } },
        components: { QInput, QBtn, QForm, QCard, QCardSection }
      },
    });

    expect(wrapper.text()).toContain('Lila Chakra Admin');
    expect(wrapper.findAllComponents(QInput).length).toBeGreaterThan(0);
  });

  it('calls auth store login on submit', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [Quasar, createTestingPinia({ createSpy: vi.fn, stubActions: false })],
        stubs: { QPage: { template: '<div><slot /></div>' } },
        components: { QInput, QBtn, QForm, QCard, QCardSection }
      },
    });

    const store = useAuthStore();
    (store.login as any).mockResolvedValue(undefined);

    const inputs = wrapper.findAllComponents(QInput);
    await inputs[0].vm.$emit('update:modelValue', 'admin');
    await inputs[1].vm.$emit('update:modelValue', 'password');
    
    // Find the native form and trigger submit
    await wrapper.find('form').trigger('submit');
    await flushPromises();
    
    expect(store.login).toHaveBeenCalledWith({ username: 'admin', password: 'password' });
  });
});
