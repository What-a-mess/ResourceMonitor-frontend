import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'

import Home from '@/components/Home.vue'
import CPUInfo from '@/components/CPUInfo.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/cpu',
        component: CPUInfo 
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;