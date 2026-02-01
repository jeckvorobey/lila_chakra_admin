<template>
  <q-page class="q-pa-md">
    <div class="text-h4 text-text-primary q-mb-md">Analytics</div>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card class="bg-surface text-text-primary">
           <q-card-section>
             <div class="text-h6">User Growth</div>
             <!-- Placeholder for chart -->
             <div class="flex flex-center" style="height: 200px; background: rgba(255,255,255,0.05)">
               Chart Placeholder
             </div>
           </q-card-section>
        </q-card>
      </div>
       <div class="col-12 col-md-6">
        <q-card class="bg-surface text-text-primary">
           <q-card-section>
             <div class="text-h6">Game Sessions</div>
             <!-- Placeholder for chart -->
             <div class="flex flex-center" style="height: 200px; background: rgba(255,255,255,0.05)">
               Chart Placeholder
             </div>
           </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AnalyticsPage'
});
</script>
