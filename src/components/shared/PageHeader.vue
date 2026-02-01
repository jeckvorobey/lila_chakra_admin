<template>
  <div class="row items-center justify-between q-mb-lg">
    <div class="text-h4 text-text-primary">{{ title }}</div>
    <div class="row q-gutter-sm">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
