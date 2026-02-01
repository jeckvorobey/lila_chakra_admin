<template>
  <q-page class="q-pa-md">
    <PageHeader title="Dashboard" />

    <div class="row q-col-gutter-md q-mb-md">
      <div v-for="(stat, index) in stats" :key="index" class="col-12 col-md-4">
        <StatCard v-bind="stat" />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12">
        <AppCard>
          <q-card-section>
            <div class="text-h6 text-text-primary">Registration Growth</div>
            <apexchart type="area" height="300" :options="chartOptions" :series="series" />
          </q-card-section>
        </AppCard>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import PageHeader from 'components/shared/PageHeader.vue';
import StatCard from 'components/analytics/StatCard.vue';
import AppCard from 'components/shared/AppCard.vue';
import { useTheme } from 'src/composables/useTheme';

defineOptions({
  name: 'IndexPage',
  components: {
    apexchart: VueApexCharts,
  }
});

const { isDark } = useTheme();

const stats = ref([
  { label: 'Total Users', value: '1,234', trend: 'up' as const, growth: '12%' },
  { label: 'Active Games', value: '56', trend: 'up' as const, growth: '5%' },
  { label: 'New Registrations', value: '+12', trend: 'up' as const, growth: '8%' },
]);

const series = ref([{
  name: 'Users',
  data: [31, 40, 28, 51, 42, 109, 100]
}]);

const chartOptions = computed(() => {
  const textColor = isDark.value ? '#A1A1AA' : '#718096';
  const borderColor = isDark.value ? '#2D3748' : '#E2E8F0';

  return {
    chart: {
      height: 350,
      type: 'area',
      toolbar: { show: false },
      background: 'transparent'
    },
    theme: {
      mode: isDark.value ? 'dark' : 'light'
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: { style: { colors: textColor } }
    },
    yaxis: {
      labels: { style: { colors: textColor } }
    },
    grid: {
      borderColor: borderColor
    }
  };
});
</script>
