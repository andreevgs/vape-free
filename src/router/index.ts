// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/vape-free',
    redirect: '/vape-free/progress',
  },
  {
    path: '/vape-free/progress',
    component: () => import('@/views/Main.vue'),
  },
  {
    path: '/vape-free/settings',
    component: () => import('@/views/Settings.vue'),
  },
  {
    path: '/vape-free/statistics',
    component: () => import('@/views/Statistics.vue'),
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
