<template>
  <q-page class="q-pa-md">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-lg">
      <div class="text-h4 text-text-primary">Analytics</div>
      <div class="row q-gutter-sm">
        <!-- Date range picker placeholder -->
        <q-btn flat icon="calendar_today" label="Last 30 Days" class="text-text-secondary" />
        <q-btn color="primary" icon="download" label="Export" unelevated />
      </div>
    </div>

    <!-- Stats Row -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div v-for="(stat, index) in stats" :key="index" class="col-12 col-sm-6 col-md-3">
        <q-card flat class="bg-surface text-text-primary rounded-borders-md">
          <q-card-section>
            <div class="text-subtitle2 text-text-secondary">{{ stat.label }}</div>
            <div class="text-h4 q-mt-sm">{{ stat.value }}</div>
            <div class="row items-center q-mt-sm">
              <q-icon :name="stat.trend === 'up' ? 'arrow_upward' : 'arrow_downward'" 
                      :color="stat.trend === 'up' ? 'positive' : 'negative'" 
                      size="xs" />
              <span :class="`text-${stat.trend === 'up' ? 'positive' : 'negative'} q-ml-xs`">
                {{ stat.growth }}
              </span>
              <span class="text-text-secondary q-ml-xs text-caption">vs last month</span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="row q-col-gutter-md">
      <!-- Line Chart (Main) -->
      <div class="col-12 col-lg">
        <q-card flat class="bg-surface text-text-primary rounded-borders-md fit">
          <q-card-section>
            <div class="text-h6">User Growth</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
             <!-- Placeholder for Chart -->
             <div class="flex flex-center bg-dark-page rounded-borders" style="height: 350px;">
               <div class="text-text-secondary">Line Chart Area</div>
             </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pie Chart (Side) -->
      <div class="col-12 col-lg-auto" style="min-width: 380px">
        <q-card flat class="bg-surface text-text-primary rounded-borders-md fit">
          <q-card-section>
            <div class="text-h6">Sessions by Device</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
             <!-- Placeholder for Chart -->
             <div class="flex flex-center bg-dark-page rounded-borders" style="height: 350px;">
               <div class="text-text-secondary">Pie Chart Area</div>
             </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'AnalyticsPage'
});

const stats = ref([
  { label: 'Total Users', value: '12,345', trend: 'up', growth: '12%' },
  { label: 'Active Sessions', value: '456', trend: 'up', growth: '5%' },
  { label: 'Avg. Game Time', value: '34m', trend: 'down', growth: '2%' },
  { label: 'Retention', value: '68%', trend: 'up', growth: '8%' },
]);
</script>

<style lang="scss" scoped>
.rounded-borders-md {
  border-radius: 12px;
}
</style>
