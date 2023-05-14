import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

import Home from '@/Home.vue';
import CPUInfo from '@/CPUInfo.vue';
import DiskInfo from '@/DiskInfo.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/cpu',
    component: CPUInfo
  },
  {
    path: '/disk/:hashcode',
    component: DiskInfo
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;