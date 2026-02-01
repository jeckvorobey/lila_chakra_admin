import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import type { AdminUser, AuthResponse, LoginPayload } from 'src/types/auth.interface';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('admin_token') || null as string | null,
    user: null as AdminUser | null,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(payload: LoginPayload) {
      const response = await api.post<AuthResponse>('/auth/login', payload);
      this.token = response.data.access_token;
      this.user = response.data.user || { id: 0, login: payload.username }; // Fallback if backend doesn't return user
      
      if (this.token) {
        localStorage.setItem('admin_token', this.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('admin_token');
      delete api.defaults.headers.common['Authorization'];
    }
  }
});
