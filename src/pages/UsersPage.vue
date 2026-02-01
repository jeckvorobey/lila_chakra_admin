<template>
  <q-page class="q-pa-md">
    <q-card class="bg-surface">
      <q-table
        title="Users"
        :rows="store.users"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        :loading="store.loading"
        @request="onRequest"
        card-class="bg-surface text-text-primary"
        table-header-class="text-text-secondary"
      >
        <template v-slot:body-cell-actions="props">
            <q-td :props="props">
                <q-btn flat round icon="edit" size="sm" />
            </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUsersStore } from 'stores/users';
import type { QTableProps } from 'quasar';

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

async function onRequest(props: any) {
  const { page, rowsPerPage } = props.pagination;
  await store.fetchUsers({ page, rowsPerPage });
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.rowsNumber = store.total;
}

onMounted(() => {
  onRequest({ pagination: pagination.value });
});
</script>
