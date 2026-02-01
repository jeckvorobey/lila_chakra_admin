<template>
  <q-page class="q-pa-md">
    <q-card class="bg-surface">
      <q-tabs
        v-model="tab"
        class="text-text-secondary"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="cells" label="Cells" />
        <q-tab name="plans" label="Plans" />
        <q-tab name="cards" label="Cards" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-surface-elevated">
        <q-tab-panel name="cells">
          <div class="row q-col-gutter-md">
             <div v-for="n in 6" :key="n" class="col-12 col-md-4 col-lg-3">
               <q-card class="bg-surface text-text-primary">
                 <q-card-section>
                   <div class="text-h6">Cell {{ n }}</div>
                   <div class="text-subtitle2">Description...</div>
                 </q-card-section>
               </q-card>
             </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="plans">
          <div class="text-h6 text-text-primary">Plans Config</div>
        </q-tab-panel>

        <q-tab-panel name="cards">
          <div class="text-h6 text-text-primary">Cards Config</div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'ContentPage'
});

const tab = ref('cells');
</script>
