<template>
  <q-card flat class="bg-surface text-text-primary rounded-borders-md fit">
    <slot></slot>
  </q-card>
</template>

<script setup lang="ts">
// Wrapper for consistent card styling
</script>

<style lang="scss" scoped>
.rounded-borders-md {
  border-radius: 12px;
}
</style>
