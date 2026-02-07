<template>
  <q-layout view="lHh Lpr fff">
    <q-page-container>
      <q-page class="flex flex-center bg-background">
        <q-card class="q-pa-md" style="width: 400px">
          <q-card-section>
            <div class="text-h6 text-center q-mb-md">Lila Chakra Admin</div>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input
                v-model="email"
                label="Email"
                type="email"
                filled
                :rules="[val => !!val || 'Required']"
              />
              <q-input
                v-model="password"
                label="Password"
                type="password"
                filled
                :rules="[val => !!val || 'Required']"
              />
              <div>
                <q-btn label="Login" type="submit" color="primary" class="full-width" :loading="loading" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

defineOptions({
  name: 'LoginPage'
});

const email = ref('');
const password = ref('');
const loading = ref(false);

const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar();

async function onSubmit() {
  loading.value = true;
  try {
    await authStore.login({ email: email.value, password: password.value });
    void router.push('/');
  } catch (error) {
    console.error(error);
    $q.notify({
      color: 'negative',
      message: 'Login failed',
      icon: 'report_problem'
    });
  } finally {
    loading.value = false;
  }
}
</script>
