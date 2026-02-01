import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Quasar, QPage, QCard, QTabs, QTab, QTabPanels, QTabPanel, QSeparator, QCardSection } from 'quasar';
import ContentPage from 'pages/ContentPage.vue';

describe('ContentPage', () => {
  it('renders content tabs', () => {
    const wrapper = mount(ContentPage, {
      global: {
        plugins: [Quasar],
        stubs: { 
            QPage: { template: '<div><slot /></div>' },
            QTabPanels: { template: '<div><slot /></div>' },
            QTabPanel: { template: '<div><slot /></div>' }
        },
        components: { QPage, QCard, QTabs, QTab, QTabPanels, QTabPanel, QSeparator, QCardSection }
      },
    });

    expect(wrapper.findComponent(QTabs).exists()).toBe(true);
    expect(wrapper.html()).toContain('Cells');
    expect(wrapper.html()).toContain('Plans');
  });
});
