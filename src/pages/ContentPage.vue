<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-lg">
      <div class="text-h4 text-text-primary">Content Management</div>
      <q-btn color="primary" icon="add" label="Add New" unelevated />
    </div>

    <!-- Custom Tabs -->
    <div class="q-mb-lg">
      <div class="row q-gutter-sm">
        <q-btn
          v-for="t in ['cells', 'plans', 'cards']"
          :key="t"
          :label="t.charAt(0).toUpperCase() + t.slice(1)"
          :color="tab === t ? 'primary' : 'surface'"
          :text-color="tab === t ? 'white' : 'text-secondary'"
          unelevated
          no-caps
          class="rounded-borders-sm"
          @click="tab = t"
        />
      </div>
    </div>

    <!-- Tab Panels / Content -->
    <q-tab-panels v-model="tab" animated class="bg-transparent">
      <q-tab-panel name="cells" class="q-pa-none">
        <div class="row q-col-gutter-md">
           <!-- Column 1 -->
           <div class="col-12 col-md-6 column q-gutter-md">
             <q-card flat class="bg-surface text-text-primary rounded-borders-md">
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
             </q-card>
           </div>
           
           <!-- Column 2 -->
           <div class="col-12 col-md-6 column q-gutter-md">
             <q-card flat class="bg-surface text-text-primary rounded-borders-md">
               <q-card-section>
                 <div class="text-h6">Special Transitions</div>
               </q-card-section>
                <q-card-section>
                 <div class="text-text-secondary">
                   Manage snakes and arrows configurations here.
                 </div>
               </q-card-section>
             </q-card>
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

defineOptions({
  name: 'ContentPage'
});

const tab = ref('cells');
</script>

<style lang="scss" scoped>
.rounded-borders-md {
  border-radius: 12px;
}
.rounded-borders-sm {
  border-radius: 8px;
}
</style>
