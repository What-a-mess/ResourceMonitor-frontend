<template>
  <el-row>
    <el-col :span="6"></el-col>
    <el-col class="cpu-usage-card" :span="12">
      <!-- <el-card class="cpuUsageCard">
        <div ref="cpuTotalUsageChartRef" style="height: 100%; width: 100%;"></div>
      </el-card> -->
      <basic-card>
        <div ref="cpuTotalUsageChartRef" style="height: 100%; width: 100%;"></div>
      </basic-card>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>
import { getCurrentInstance, onBeforeUnmount, onMounted, ref } from "vue";
import CPUApi from "@/api/cpuapi.js";
import BasicCard from '@/components/BasicCard.vue';
export default {
  name: "CPUInfo",
  components: {
    BasicCard
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const LEN = ref(60);
    let cpuUsage = [];
    let coreUsage = [[]];
    let cpuInfo = {};
    let timer = '';

    function fetchData() {
      CPUApi.getCPUUsage().then(resp => {
        cpuUsage.shift();
        cpuUsage.push({ name: new Date().getTime(), value: resp.data });
      }).catch(err => {
        cpuUsage.shift();
        cpuUsage.push(0);
      });
      CPUApi.getCoreUsage().then(resp => {
        let tempCoreUsage = resp.data;
        for (let [i, usage] of tempCoreUsage) {
          coreUsage[i].shift(1);
          coreUsage[i].push(usage);
        }
      }).catch(err => {
        for (let i = 0; i < coreUsage.length; i++) {
          coreUsage[i].shift(1);
          coreUsage[i].push(0);
        }
      });

    }

    cpuInfo = CPUApi.getCPUInfo;
    cpuUsage = new Array(60).fill({ name: 0, value: 0 });
    for (let i = 0; i < cpuInfo.logicalProcessorsCnt; i++) {
      coreUsage.push(new Array(60).fill(0));
    }

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
          data: cpuUsage,
          type: 'line',
        }
      ]
    };
    onMounted(() => {
      const cpuUsageChart = proxy.$echarts.init(cpuTotalUsageChartRef.value);
      cpuUsageChart.setOption(cpuTotalUsgChartOpt);
      fetchData();
      timer = setInterval(() => {
        fetchData();
        cpuUsageChart.setOption({
          series: {
            data: cpuUsage
          }
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
      cpuTotalUsageChartRef
    }
  }
}
</script>

<style scoped>
cpu-usage-card {
  height: 200px;
}
</style>