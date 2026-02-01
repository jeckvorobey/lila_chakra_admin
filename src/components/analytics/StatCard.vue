<template>
  <AppCard>
    <q-card-section>
      <div class="text-subtitle2 text-text-secondary">{{ label }}</div>
      <div class="text-h4 q-mt-sm">{{ value }}</div>
      <div class="row items-center q-mt-sm">
        <q-icon
          :name="trend === 'up' ? 'arrow_upward' : 'arrow_downward'"
          :color="trend === 'up' ? 'positive' : 'negative'"
          size="xs"
        />
        <span :class="`text-${trend === 'up' ? 'positive' : 'negative'} q-ml-xs`">
          {{ growth }}
        </span>
        <span v-if="caption" class="text-text-secondary q-ml-xs text-caption">{{ caption }}</span>
      </div>
    </q-card-section>
  </AppCard>
</template>

<script setup lang="ts">
import AppCard from 'components/shared/AppCard.vue';

interface Props {
  label: string;
  value: string | number;
  trend: 'up' | 'down';
  growth: string;
  caption?: string;
}

defineProps<Props>();
</script>
