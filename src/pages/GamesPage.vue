<template>
  <q-page class="q-pa-md">
    <PageHeader title="Games" />

    <AppCard>
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="id"
        flat
        card-class="bg-surface text-text-primary"
        table-header-class="text-text-secondary"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip :color="getStatusColor(props.value)" text-color="white" size="sm">
              {{ props.value }}
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round icon="visibility" size="sm" />
          </q-td>
        </template>
      </q-table>
    </AppCard>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageHeader from 'components/shared/PageHeader.vue';
import AppCard from 'components/shared/AppCard.vue';

defineOptions({
  name: 'GamesPage'
});

const columns = [
  { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
  { name: 'user', label: 'User', field: 'user', sortable: true, align: 'left' },
  { name: 'status', label: 'Status', field: 'status', sortable: true, align: 'left' },
  { name: 'created_at', label: 'Created At', field: 'created_at', sortable: true, align: 'right' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
];

const rows = ref([
  { id: 1, user: 'user1', status: 'active', created_at: '2023-10-01' },
  { id: 2, user: 'user2', status: 'finished', created_at: '2023-09-28' },
]);

function getStatusColor(status: string) {
  return status === 'active' ? 'positive' : 'grey';
}
</script>