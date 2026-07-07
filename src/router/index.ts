import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/nobel',
      name: 'nobel',
      component: () => import('../views/NobelView.vue'),
    },
    {
      path: '/lasker',
      name: 'lasker',
      component: () => import('../views/LaskerView.vue'),
    },
    {
      path: '/darwin',
      name: 'darwin',
      component: () => import('../views/DarwinView.vue'),
    },
    {
      path: '/fields',
      name: 'fields',
      component: () => import('../views/FieldsView.vue'),
    },
    {
      path: '/turing',
      name: 'turing',
      component: () => import('../views/TuringView.vue'),
    },
    {
      path: '/hugo',
      name: 'hugo',
      component: () => import('../views/HugoView.vue'),
    },
    {
      path: '/pritzker',
      name: 'pritzker',
      component: () => import('../views/PritzkerView.vue'),
    },
    {
      path: '/pulitzer',
      name: 'pulitzer',
      component: () => import('../views/PulitzerView.vue'),
    },
    {
      path: '/wolf',
      name: 'wolf',
      component: () => import('../views/WolfView.vue'),
    },
    {
      path: '/oscar',
      name: 'oscar',
      component: () => import('../views/OscarView.vue'),
    },
    {
      path: '/grammy',
      name: 'grammy',
      component: () => import('../views/GrammyView.vue'),
    },
  ],
})

export default router
