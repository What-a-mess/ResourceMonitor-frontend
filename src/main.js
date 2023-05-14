import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';

import router from './router';
import * as echarts from 'echarts';

const app = createApp(App);

app.use(ElementPlus)
    .use(router);

app.config.globalProperties.$echarts = echarts;
app.mount('#app');