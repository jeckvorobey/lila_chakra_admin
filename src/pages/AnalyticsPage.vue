<template>
  <q-page class="q-pa-md">
    <PageHeader title="Analytics">
      <template #actions>
        <q-btn flat icon="calendar_today" label="Last 30 Days" class="text-text-secondary" />
        <q-btn color="primary" icon="download" label="Export" unelevated />
      </template>
    </PageHeader>

    <!-- Stats Row -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div v-for="(stat, index) in stats" :key="index" class="col-12 col-sm-6 col-md-3">
        <StatCard v-bind="stat" caption="vs last month" />
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="row q-col-gutter-md">
      <!-- Line Chart (Main) -->
      <div class="col-12 col-lg">
        <AppCard>
          <q-card-section>
            <div class="text-h6">User Growth</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
             <!-- Placeholder for Chart -->
             <div class="flex flex-center bg-surface-elevated rounded-borders" style="height: 350px;">
               <div class="text-text-secondary">Line Chart Area</div>
             </div>
          </q-card-section>
        </AppCard>
      </div>

      <!-- Pie Chart (Side) -->
      <div class="col-12 col-lg-auto" style="min-width: 380px">
        <AppCard>
          <q-card-section>
            <div class="text-h6">Sessions by Device</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
             <!-- Placeholder for Chart -->
             <div class="flex flex-center bg-surface-elevated rounded-borders" style="height: 350px;">
               <div class="text-text-secondary">Pie Chart Area</div>
             </div>
          </q-card-section>
        </AppCard>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageHeader from 'components/shared/PageHeader.vue';
import AppCard from 'components/shared/AppCard.vue';
import StatCard from 'components/analytics/StatCard.vue';

defineOptions({
  name: 'AnalyticsPage'
});

const stats = ref([
  { label: 'Total Users', value: '12,345', trend: 'up' as const, growth: '12%' },
  { label: 'Active Sessions', value: '456', trend: 'up' as const, growth: '5%' },
  { label: 'Avg. Game Time', value: '34m', trend: 'down' as const, growth: '2%' },
  { label: 'Retention', value: '68%', trend: 'up' as const, growth: '8%' },
]);
</script>