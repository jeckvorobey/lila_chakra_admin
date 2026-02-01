import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as any[],
    loading: false,
    total: 0
  }),
  
  actions: {
    async fetchUsers(props: { page: number; rowsPerPage: number } = { page: 1, rowsPerPage: 10 }) {
      this.loading = true;
      try {
        const response = await api.get('/users', { 
            params: { 
                page: props.page, 
                limit: props.rowsPerPage 
            } 
        });
        this.users = response.data.items;
        this.total = response.data.total;
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    }
  }
});
