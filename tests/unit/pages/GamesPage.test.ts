import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Quasar, QPage, QCard, QTable, QChip, QBtn, QTd } from 'quasar';
import GamesPage from 'pages/GamesPage.vue';

describe('GamesPage', () => {
  it('renders games table', () => {
    const wrapper = mount(GamesPage, {
      global: {
        plugins: [Quasar],
        stubs: { 
            QPage: { template: '<div><slot /></div>' },
            QTable: true 
        },
        components: { QPage, QCard, QTable, QChip, QBtn, QTd }
      },
    });

    expect(wrapper.findComponent(QTable).exists()).toBe(true);
    expect(wrapper.html()).toContain('Games');
  });
});
