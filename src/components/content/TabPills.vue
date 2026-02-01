<template>
  <div class="row q-gutter-sm">
    <q-btn
      v-for="tab in tabs"
      :key="tab.value"
      :label="tab.label"
      :color="modelValue === tab.value ? 'primary' : 'surface'"
      :text-color="modelValue === tab.value ? 'white' : 'text-secondary'"
      unelevated
      no-caps
      class="rounded-borders-sm"
      @click="$emit('update:modelValue', tab.value)"
    />
  </div>
</template>

<script setup lang="ts">
interface TabOption {
  label: string;
  value: string;
}

defineProps<{
  tabs: TabOption[];
  modelValue: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style lang="scss" scoped>
.rounded-borders-sm {
  border-radius: 8px;
}
</style>
