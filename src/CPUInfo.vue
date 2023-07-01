<template>
  <div>
    <h1>CPU信息</h1> <br/>
    <el-row>
      <el-col :span="15">
        <!-- <el-card class="cpuUsageCard">
          <div ref="cpuTotalUsageChartRef" style="height: 100%; width: 100%;"></div>
        </el-card> -->
        <div>
          <title-card title="CPU占用率" class="cpu-usage-card">
            <div ref="cpuTotalUsageChartRef" class="cpu-usage-chart"></div>
          </title-card>
        </div>
      </el-col>
      <el-col :span="8" :offset="1">
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
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeUnmount, onMounted, ref } from "vue";
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
          areaStyle: {},
          smooth: 0.15
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