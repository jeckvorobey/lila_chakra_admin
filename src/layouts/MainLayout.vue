<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-surface text-text-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Lila Chakra Admin
        </q-toolbar-title>
        
        <q-btn flat round :icon="isDark ? 'light_mode' : 'dark_mode'" @click="toggleTheme" />
        <q-btn flat round icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-surface"
    >
      <q-list>
        <q-item-label header>
          Navigation
        </q-item-label>

        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/users">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Users</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/games">
          <q-item-section avatar>
            <q-icon name="casino" />
          </q-item-section>
          <q-item-section>Games</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/content">
          <q-item-section avatar>
            <q-icon name="library_books" />
          </q-item-section>
          <q-item-section>Content</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/analytics">
          <q-item-section avatar>
            <q-icon name="analytics" />
          </q-item-section>
          <q-item-section>Analytics</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';
import { useTheme } from 'src/composables/useTheme';

defineOptions({
  name: 'MainLayout'
});

const leftDrawerOpen = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const { toggleTheme, isDark } = useTheme();

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

async function logout() {
  await authStore.logout();
  void router.push('/login');
}
</script>