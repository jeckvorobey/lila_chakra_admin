<template>
  <q-page class="q-pa-md">
    <PageHeader title="Content Management">
      <template #actions>
        <q-btn color="primary" icon="add" label="Add New" unelevated />
      </template>
    </PageHeader>

    <div class="q-mb-lg">
      <TabPills v-model="tab" :tabs="tabs" />
    </div>

    <q-tab-panels v-model="tab" animated class="bg-transparent">
      <q-tab-panel name="cells" class="q-pa-none">
        <div class="row q-col-gutter-md">
           <!-- Column 1 -->
           <div class="col-12 col-md-6 column q-gutter-md">
             <AppCard>
               <q-card-section>
                 <div class="text-h6">Core Cells (1-72)</div>
               </q-card-section>
               <q-card-section>
                 <q-list separator>
                   <q-item v-for="n in 5" :key="n">
                     <q-item-section avatar>
                       <q-avatar size="md" color="primary" text-color="white">{{ n }}</q-avatar>
                     </q-item-section>
                     <q-item-section>
                       <q-item-label>Cell Title {{ n }}</q-item-label>
                       <q-item-label caption class="text-text-secondary">Basic description...</q-item-label>
                     </q-item-section>
                     <q-item-section side>
                       <q-btn flat round icon="edit" size="sm" color="text-secondary" />
                     </q-item-section>
                   </q-item>
                 </q-list>
               </q-card-section>
             </AppCard>
           </div>
           
           <!-- Column 2 -->
           <div class="col-12 col-md-6 column q-gutter-md">
             <AppCard>
               <q-card-section>
                 <div class="text-h6">Special Transitions</div>
               </q-card-section>
                <q-card-section>
                 <div class="text-text-secondary">
                   Manage snakes and arrows configurations here.
                 </div>
               </q-card-section>
             </AppCard>
           </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="plans" class="q-pa-none">
        <div class="text-h6 text-text-primary">Plans Configuration</div>
      </q-tab-panel>

      <q-tab-panel name="cards" class="q-pa-none">
        <div class="text-h6 text-text-primary">Cards Configuration</div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageHeader from 'components/shared/PageHeader.vue';
import AppCard from 'components/shared/AppCard.vue';
import TabPills from 'components/content/TabPills.vue';

defineOptions({
  name: 'ContentPage'
});

const tab = ref('cells');

const tabs = [
  { label: 'Cells', value: 'cells' },
  { label: 'Plans', value: 'plans' },
  { label: 'Cards', value: 'cards' },
];
</script>