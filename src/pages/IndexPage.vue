<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-4">
        <q-card class="bg-surface">
          <q-card-section>
            <div class="text-subtitle2 text-text-secondary">Total Users</div>
            <div class="text-h4 text-primary">1,234</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="bg-surface">
          <q-card-section>
            <div class="text-subtitle2 text-text-secondary">Active Games</div>
            <div class="text-h4 text-secondary">56</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="bg-surface">
          <q-card-section>
            <div class="text-subtitle2 text-text-secondary">New Registrations</div>
            <div class="text-h4 text-accent">+12</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card class="bg-surface">
          <q-card-section>
            <div class="text-h6 text-text-primary">Registration Growth</div>
            <apexchart type="area" height="300" :options="chartOptions" :series="series" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

defineOptions({
  name: 'IndexPage',
  components: {
    apexchart: VueApexCharts,
  }
});

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