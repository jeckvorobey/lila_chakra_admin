<template>
  <q-page class="q-pa-md">
    <PageHeader title="Users" />

    <AppCard>
      <q-table
        :rows="store.users"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        :loading="store.loading"
        flat
        card-class="bg-surface text-text-primary"
        table-header-class="text-text-secondary"
        @request="onRequest"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round icon="edit" size="sm" />
          </q-td>
        </template>
      </q-table>
    </AppCard>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUsersStore } from 'stores/users';
import type { QTableProps } from 'quasar';
import PageHeader from 'components/shared/PageHeader.vue';
import AppCard from 'components/shared/AppCard.vue';

defineOptions({
  name: 'UsersPage'
});

const store = useUsersStore();

const columns: QTableProps['columns'] = [
  { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
  { name: 'login', label: 'Login', field: 'login', sortable: true, align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
];

const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
});

async function onRequest(props: { pagination: { sortBy: string; descending: boolean; page: number; rowsPerPage: number; rowsNumber?: number } }) {
  const { page, rowsPerPage } = props.pagination;
  await store.fetchUsers({ page, rowsPerPage });
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.rowsNumber = store.total;
}

onMounted(() => {
  void onRequest({ pagination: pagination.value });
});
</script>