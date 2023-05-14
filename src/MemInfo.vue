<template>
  <div>
    <h1>内存使用情况</h1>
    <el-row>
      <el-col :span="18" :offset="3">
        <div>
          <title-card title="内存占用" class="mem-usage-card">
            <div ref="memUsageChartRef" class="mem-usage-chart"></div>
          </title-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TitleCard from '@/components/TitleCard.vue'
import { store } from '@/utils/store';
import { getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue';
export default {
  components: {
    TitleCard
  },
  setup() {
    const memUsageChartRef = ref(null);
    const { proxy } = getCurrentInstance();
    let updateTimer = '';

    let memUsageChartOpt = {
      xAxis: {
        type: 'category',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        max: store.totalMem,
        min: 0,
        axisLabel: {
          formatter: function (val) {
            let suffix = ['B', 'KB', 'MB', 'GB', 'TB'];
            let i = 0;
            while (val > 1024) {
              val /= 1024
              i++;
            }
            return val.toFixed(1) + ' ' + suffix[i];
          }
        }
      },
      series: [
        {
          data: store.consumedMem,
          type: 'line',
          showSymbol: false,
          areaStyle: {},
          smooth: 0.15
        }
      ]
    };

    onMounted(() => {
      const memUsageChart = proxy.$echarts.init(memUsageChartRef.value);
      memUsageChart.setOption(memUsageChartOpt);
      updateTimer = setInterval(() => {
        memUsageChartOpt.series.data = store.consumedMem;
        memUsageChartOpt.yAxis.max = store.totalMem;
        memUsageChart.setOption(memUsageChartOpt);
      }, 1000);
      window.onresize = () => {
        memUsageChart.resize();
      }
    });

    onBeforeUnmount(() => {
      clearInterval(updateTimer);
    })

    return {
      memUsageChartRef,
      store
    };
  }
}
</script>

<style scoped>
.mem-usage-card {
  height: 500px;
}
.mem-usage-chart {
  height: 100%;
  width: 100%;
}
</style>