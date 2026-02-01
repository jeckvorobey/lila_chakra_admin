import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Quasar, QPage, QCard, QCardSection } from 'quasar';
import IndexPage from 'pages/IndexPage.vue';
import { ref } from 'vue';

// Mock useTheme
const isDarkMock = ref(true);
vi.mock('src/composables/useTheme', () => ({
  useTheme: () => ({
    isDark: isDarkMock
  })
}));

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

  it('updates chart options when theme changes', async () => {
    // Start with Dark Mode
    isDarkMock.value = true;
    
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

    // Verify Dark Mode Styles
    const vm = wrapper.vm as any;
    expect(vm.chartOptions.theme.mode).toBe('dark');
    expect(vm.chartOptions.grid.borderColor).toBe('#2D3748');
    expect(vm.chartOptions.xaxis.labels.style.colors).toBe('#A1A1AA');

    // Switch to Light Mode
    isDarkMock.value = false;
    await wrapper.vm.$nextTick();

    // Verify Light Mode Styles
    expect(vm.chartOptions.theme.mode).toBe('light');
    expect(vm.chartOptions.grid.borderColor).toBe('#E2E8F0');
    expect(vm.chartOptions.xaxis.labels.style.colors).toBe('#718096');
  });
});
