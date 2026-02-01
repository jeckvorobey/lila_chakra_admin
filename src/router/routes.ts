import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // meta: { requiresAuth: true }, // Temporarily disabled for visual inspection
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'users', component: () => import('pages/UsersPage.vue') },
      { path: 'games', component: () => import('pages/GamesPage.vue') },
      { path: 'content', component: () => import('pages/ContentPage.vue') },
      { path: 'analytics', component: () => import('pages/AnalyticsPage.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;