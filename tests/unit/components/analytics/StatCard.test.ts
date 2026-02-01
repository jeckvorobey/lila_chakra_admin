import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Quasar, QCard, QCardSection, QIcon } from 'quasar';
import StatCard from 'components/analytics/StatCard.vue';
import AppCard from 'components/shared/AppCard.vue';

describe('StatCard', () => {
  it('renders label and value', () => {
    const wrapper = mount(StatCard, {
        global: { 
            plugins: [Quasar],
            components: { AppCard, QCard, QCardSection, QIcon }
        },
        props: { 
            label: 'Total Users', 
            value: '100', 
            trend: 'up', 
            growth: '10%' 
        }
    });
    expect(wrapper.text()).toContain('Total Users');
    expect(wrapper.text()).toContain('100');
    expect(wrapper.text()).toContain('10%');
  });
});
