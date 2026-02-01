import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Quasar } from 'quasar';
import PageHeader from 'components/shared/PageHeader.vue';

describe('PageHeader', () => {
  it('renders title', () => {
    const wrapper = mount(PageHeader, {
        global: { plugins: [Quasar] },
        props: { title: 'Test Title' }
    });
    expect(wrapper.text()).toContain('Test Title');
  });

  it('renders actions slot', () => {
    const wrapper = mount(PageHeader, {
        global: { plugins: [Quasar] },
        props: { title: 'Test' },
        slots: { actions: '<button>Action</button>' }
    });
    expect(wrapper.html()).toContain('Action');
  });
});
