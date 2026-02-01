import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Quasar, QBtn } from 'quasar';
import TabPills from 'components/content/TabPills.vue';

describe('TabPills', () => {
  it('renders tabs and emits update event', async () => {
    const wrapper = mount(TabPills, {
        global: { 
            plugins: [Quasar],
            components: { QBtn }
        },
        props: { 
            tabs: [{ label: 'Tab 1', value: 't1' }, { label: 'Tab 2', value: 't2' }],
            modelValue: 't1' 
        }
    });
    
    expect(wrapper.text()).toContain('Tab 1');
    expect(wrapper.text()).toContain('Tab 2');
    
    // Find second button and click
    const buttons = wrapper.findAll('.q-btn');
    expect(buttons.length).toBe(2);
    await buttons[1]!.trigger('click');
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['t2']);
  });
});
