import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Quasar, QPage, QCard, QCardSection } from 'quasar';
import IndexPage from 'pages/IndexPage.vue';

describe('Dashboard (IndexPage)', () => {
  it('renders KPI cards', () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [Quasar],
        components: { QPage, QCard, QCardSection },
        stubs: { 
          QPage: { template: '<div><slot /></div>' },
          apexchart: true 
        }
      },
    });

    expect(wrapper.text()).toContain('Total Users');
    expect(wrapper.text()).toContain('Active Games');
  });
});
