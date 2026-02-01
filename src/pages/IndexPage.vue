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
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import PageHeader from 'components/shared/PageHeader.vue';
import StatCard from 'components/analytics/StatCard.vue';
import AppCard from 'components/shared/AppCard.vue';

defineOptions({
  name: 'IndexPage',
  components: {
    apexchart: VueApexCharts,
  }
});

const stats = ref([
  { label: 'Total Users', value: '1,234', trend: 'up' as const, growth: '12%' },
  { label: 'Active Games', value: '56', trend: 'up' as const, growth: '5%' },
  { label: 'New Registrations', value: '+12', trend: 'up' as const, growth: '8%' },
]);

const series = ref([{
  name: 'Users',
  data: [31, 40, 28, 51, 42, 109, 100]
}]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: 'area',
    toolbar: { show: false },
    background: 'transparent'
  },
  theme: {
    mode: 'dark' // Should be reactive to theme, but hardcoded for MVP
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth' },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: { style: { colors: '#A1A1AA' } }
  },
  yaxis: {
    labels: { style: { colors: '#A1A1AA' } }
  },
  grid: {
    borderColor: '#2D3748'
  }
});
</script>
