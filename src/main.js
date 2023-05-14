import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from '@/App.vue';

import router from '@/utils/router';
import * as echarts from 'echarts';
import { store } from '@/utils/store'

const app = createApp(App);

app.use(ElementPlus)
    .use(router);

app.config.globalProperties.$echarts = echarts;
app.mount('#app');

store.init();

setInterval(() => { store.fetchData(); }, 1000);