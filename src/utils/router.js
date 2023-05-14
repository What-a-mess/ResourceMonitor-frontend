import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

import Home from '@/Home.vue';
import CPUInfo from '@/CPUInfo.vue';
import DiskInfo from '@/DiskInfo.vue';
import IFInfo from '@/IFInfo.vue'
import FSInfo from '@/FSInfo.vue'
import MemInfo from '@/MemInfo.vue'

const routes = [
  {
    path: '/',
    component: CPUInfo
  }, {
    path: '/cpu',
    component: CPUInfo
  }, {
    path: '/disk/:hashcode',
    component: DiskInfo
  }, {
    path: '/if/:hashcode',
    component: IFInfo
  }, {
    path: '/fs',
    component: FSInfo
  }, {
    path: '/mem',
    component: MemInfo
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;