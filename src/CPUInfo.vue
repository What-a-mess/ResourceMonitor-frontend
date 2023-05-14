<template>
  <el-row>
    <el-col :span="14" :offset="1">
      <!-- <el-card class="cpuUsageCard">
        <div ref="cpuTotalUsageChartRef" style="height: 100%; width: 100%;"></div>
      </el-card> -->
      <div>
        <title-card title="CPU占用率" class="cpu-usage-card">
          <div ref="cpuTotalUsageChartRef" class="cpu-usage-chart"></div>
        </title-card>
      </div>
    </el-col>
    <el-col :span="7" :offset="1">
      <title-card title="CPU基本信息">
        <h4>CPU名称</h4>
        <p>{{ store.cpuInfo.name }}</p>
        <h4>CPU主频</h4>
        <p>{{ baseFreqStr }}</p>
        <h4>物理核心数</h4>
        <p>{{ store.cpuInfo.physicalProcessorsCnt }}</p>
        <h4>逻辑核心数</h4>
        <p>{{ store.cpuInfo.logicalProcessorsCnt }}</p>
      </title-card>
    </el-col>
  </el-row>
</template>

<script>
import { getCurrentInstance, onBeforeUnmount, onMounted, ref } from "vue";
import CPUApi from "@/api/cpuapi.js";
import TitleCard from '@/components/TitleCard.vue';
import { computed } from "@vue/reactivity";
import { store } from "@/utils/store"
export default {
  name: "CPUInfo",
  components: {
    TitleCard
  },
  setup() {
    const { proxy } = getCurrentInstance();
    // const LEN = ref(60);
    // let cpuUsage = [];
    // let coreUsage = [[]];
    // const cpuInfo = ref({
    //   name: "temp",
    //   baseFreq: 0,
    //   logicalProcessorsCnt: 0,
    //   physicalProcessorsCnt: 0
    // });
    let timer = '';

    let baseFreqStr = computed(() => {
      let tempFreq = store.cpuInfo.baseFreq;
      if (tempFreq >= 1e9) {
        return (tempFreq / 1e9).toFixed(1) + ' GHz';
      } else if (tempFreq >= 1e6) {
        return (tempFreq / 1e6).toFixed(1) + ' MHz';
      } else if (tempFreq >= 1e3) {
        return (tempFreq / 1e3).toFixed(1) + ' KHz';
      } else {
        return tempFreq + ' Hz';
      }
    });

    // function fetchData() {
    //   CPUApi.getCPUUsage().then(resp => {
    //     cpuUsage.shift();
    //     cpuUsage.push({ name: new Date().getTime(), value: resp.data });
    //   }).catch(err => {
    //     cpuUsage.shift();
    //     cpuUsage.push(0);
    //   });
    //   CPUApi.getCoreUsage().then(resp => {
    //     let tempCoreUsage = resp.data;
    //     for (let [i, usage] of tempCoreUsage) {
    //       coreUsage[i].shift(1);
    //       coreUsage[i].push(usage);
    //     }
    //   }).catch(err => {
    //     for (let i = 0; i < coreUsage.length; i++) {
    //       coreUsage[i].shift(1);
    //       coreUsage[i].push(0);
    //     }
    //   });
    // }

    // CPUApi.getCPUInfo().then(resp => {  
    //   cpuInfo.value = resp.data;
    // });
    // cpuUsage = new Array(60).fill({ name: 0, value: 0 });
    // for (let i = 0; i < cpuInfo.logicalProcessorsCnt; i++) {
    //   coreUsage.push(new Array(60).fill(0));
    // }

    const cpuTotalUsageChartRef = ref(null);
    const cpuTotalUsgChartOpt = {
      xAxis: {
        type: 'category',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        max: 1,
        min: 0,
        axisLabel: {
          formatter: function (val) {
            return val * 100 + '%';
          }
        }
      },
      series: [
        {
          data: store.cpuUsage,
          type: 'line',
          showSymbol: false,
          areaStyle: {}
        }
      ]
    };
    onMounted(() => {
      const cpuUsageChart = proxy.$echarts.init(cpuTotalUsageChartRef.value);
      cpuUsageChart.setOption(cpuTotalUsgChartOpt);
      timer = setInterval(() => {
        cpuUsageChart.setOption({
          series: [{
            data: store.cpuUsage
          }]
        })
      }, 1000);
      window.onresize = () => {
        cpuUsageChart.resize();
      }
    });

    onBeforeUnmount(() => {
      clearInterval(timer);
    });

    return {
      cpuTotalUsageChartRef,
      // cpuInfo,
      baseFreqStr,
      store
    }
  }
}
</script>

<style scoped>
.cpu-usage-card {
  height: 500px;
}
.info-subtitle {
  font-weight: 600 !important;
}
.cpu-usage-chart {
  height: 100%;
  width: 100%;
}
</style>