import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Quasar, QPage, QCard, QCardSection } from 'quasar';
import AnalyticsPage from 'pages/AnalyticsPage.vue';

describe('AnalyticsPage', () => {
  it('renders analytics charts placeholder', () => {
    const wrapper = mount(AnalyticsPage, {
      global: {
        plugins: [Quasar],
        stubs: { 
            QPage: { template: '<div><slot /></div>' },
        },
        components: { QPage, QCard, QCardSection }
      },
    });

    expect(wrapper.text()).toContain('Analytics');
    expect(wrapper.findAllComponents(QCard).length).toBeGreaterThan(0);
  });
});
