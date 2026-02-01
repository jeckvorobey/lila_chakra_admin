import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Quasar } from 'quasar';
import IndexPage from 'pages/IndexPage.vue';

describe('IndexPage', () => {
  it('renders correctly', () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [Quasar],
        stubs: {
          QPage: { template: '<div><slot /></div>' }
        }
      },
    });
    expect(wrapper.text()).toContain('Lila Chakra Admin');
  });
});