<template>
  <div>
    <h1>磁盘{{ diskInfo.get('name') }}</h1> <br/>
    <el-row>
      <el-col :span="18" :offset="3">
        <div>
          <title-card title="磁盘忙时间" class="disk-usage-card">
            <div ref="diskUsageChartRef" class="disk-usage-chart"></div>
          </title-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3">
        <title-card title="磁盘IO速度" class="disk-io-card">
          <div ref="diskIOChartRef" class="disk-io-chart"></div>
        </title-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { store } from '@/utils/store';
import { getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import TitleCard from '@/components/TitleCard.vue';

export default {
  components: {
    TitleCard
  },
  setup() {
    const route = useRoute();
    // console.log(route.params.hashcode)
    // console.log(store.diskInfoMap.get(route.params.hashcode));
    let diskInfo = ref(new Map());
    const diskUsageChartRef = ref(null);
    const diskIOChartRef = ref(null);
    const { proxy } = getCurrentInstance();
    let updateTimer = '';
    
    const diskUsageChartOpt = {
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
          data: diskInfo.value.get('usage'),
          type: 'line',
          showSymbol: false,
          areaStyle: {}
        }
      ]
    };
    const diskIOChartOpt = {
      legend: {},
      xAxis: {
        type: 'category',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        axisLabel: {
          formatter: function (val) {
            let i = 0;
            let suffix = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s'];
            while (val > 1024 && i < 5) {
              val /= 1024;
              i++;
            }

            return (val.toFixed(1) + suffix[i]);
          }
        }
      },
      series: [
        {
          name: 'ioread',
          data: diskInfo.value.get('ioread'),
          type: 'line',
          showSymbol: false,
          areaStyle: {}
        },{
          name: 'iowrite',
          data: diskInfo.value.get('iowrite'),
          type: 'line',
          showSymbol: false,
          areaStyle: {}
        }
      ]
    };
    onMounted(() => {
      const diskUsageChart = proxy.$echarts.init(diskUsageChartRef.value);
      diskUsageChart.setOption(diskUsageChartOpt);
      const diskIOChart = proxy.$echarts.init(diskIOChartRef.value);
      diskIOChart.setOption(diskIOChartOpt);
      updateTimer = setInterval(() => {
        diskInfo.value = store.diskInfoMap.get(Number(route.params.hashcode));
        diskUsageChart.setOption({
          series: {
            data: diskInfo.value.get('usage')
          }
        });
        diskIOChart.setOption({
          series: [{
            name: 'ioread',
            data: diskInfo.value.get('ioread')
          }, {
            name: 'iowrite',
            data: diskInfo.value.get('iowrite')
          }]
        })
      }, 1000);
      window.onresize = () => {
        diskUsageChart.resize();
        diskIOChart.resize();
      }
    });
    onBeforeUnmount(() => {
      clearInterval(updateTimer);
    })

    return {
      store,
      diskInfo,
      diskUsageChartRef,
      diskIOChartRef
    };
  }
}

</script>

<style scoped>
.disk-usage-card {
  height: 500px;
}
.disk-usage-chart {
  height: 100%;
  width: 100%;
}
.disk-io-chart {
  height: 100%;
  width: 100%;
}
.disk-io-card {
  height: 500px;
}
</style>