<template>
  <div>
    <h1>网卡 {{ ifInfo.get('displayName') }}</h1> <br/>
    <el-row>
      <el-col :span="15">
        <title-card :title="isTxSpd ? '传输速率' : '数据包数'" class="if-card">
          <div ref="ifTxSpeedChartRef" class="if-chart"></div>
          <div style="text-align: right; padding-right: 3%;"><el-switch v-model="isTxSpd" active-text="传输速率" inactive-text="数据包数"></el-switch></div>
        </title-card>
      </el-col>
      <el-col :span="8" :offset="1">
        <title-card title="网卡信息">
          <h4>网卡名称</h4>
          <p>{{ ifInfo.get('displayName') }}</p>
          <h4>IPv4地址</h4>
          <p>{{ ifInfo.get('IPv4Addr') }}</p>
          <h4>IPv6地址</h4>
          <p>{{ ifInfo.get('IPv6Addr') }}</p>
          <h4>MAC地址</h4>
          <p>{{ ifInfo.get('MACAddr') }}</p>
          <h4>连接速率</h4>
          <p>{{ speedRate }}</p>
        </title-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="15" :offset="0" style="text-align: right;"></el-col>
    </el-row>
  </div>
</template>

<script>
import TitleCard from '@/components/TitleCard.vue';
import { getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue';
import { store } from '@/utils/store'
import { useRoute } from 'vue-router';
import { computed } from '@vue/reactivity';

export default {
  components: {
    TitleCard
  },
  setup() {
    const route = useRoute();
    const isTxSpd = ref(true);
    const ifInfo = ref(new Map());
    const ifTxSpeedChartRef = ref(null);
    let updateTimer = '';
    const { proxy } = getCurrentInstance();
    let cardTitle = "传输速率";
    const speedRate = computed(() => {
      let tempSpd = ifInfo.value.get('speedRate');
      if (!Number.isFinite(tempSpd)) return '';
      let suffix = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'];
      let i = 0;
      while (tempSpd >= 1000) {
        tempSpd /= 1000;
        i++;
      }
      return tempSpd.toFixed(1) + ' ' + suffix[i];
    })

    const ifTxSpeedChartOpt = {
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
            val *= 8;
            let i = 0;
            let suffix = ['b/s', 'Kb/s', 'Mb/s', 'Gb/s', 'Tb/s'];
            while (val > 1000 && i < 5) {
              val /= 1000;
              i++;
            }

            return (val.toFixed(1) + ' ' + suffix[i]);
          }
        }
      },
      series: [
        {
          name: 'download',
          data: ifInfo.value.get('recvSpeed'),
          type: 'line',
          showSymbol: false,
          areaStyle: {}
        },{
          name: 'upload',
          data: ifInfo.value.get('sendSpeed'),
          type: 'line',
          showSymbol: false,
          areaStyle: {}
        }
      ]
    };

    const ifPktSpeedChartOpt = {
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
            return val + '/s';
          }
        }
      },
      series: [
        {
          name: 'download',
          data: ifInfo.value.get('recvPktSpeed'),
          type: 'line',
          showSymbol: false,
          areaStyle: {}
        },{
          name: 'upload',
          data: ifInfo.value.get('sendPktSpeed'),
          type: 'line',
          showSymbol: false,
          areaStyle: {}
        }
      ]
    };

    onMounted(() => {
      const ifTxSpeedChart = proxy.$echarts.init(ifTxSpeedChartRef.value);
      ifTxSpeedChart.setOption(ifTxSpeedChartOpt);
      updateTimer = setInterval(() => {
        // console.log("timed")
        if (isTxSpd.value) {
          ifInfo.value = store.ifInfoMap.get(Number(route.params.hashcode));
          // console.log(ifInfo.value);
          ifTxSpeedChartOpt.series[0].data = ifInfo.value.get('recvSpeed');
          ifTxSpeedChartOpt.series[1].data = ifInfo.value.get('sendSpeed');
          ifTxSpeedChart.setOption(ifTxSpeedChartOpt);
        } else {
          ifPktSpeedChartOpt.series[0].data = ifInfo.value.get('recvPktSpeed');
          ifPktSpeedChartOpt.series[1].data = ifInfo.value.get('sendPktSpeed');
          ifTxSpeedChart.setOption(ifPktSpeedChartOpt);
        }
        window.onresize = () => {
          ifTxSpeedChart.resize();
        };
      }, 1000);
    });

    onBeforeUnmount(() => {
      clearInterval(updateTimer);
    });
    
    return {
      isTxSpd,
      ifInfo,
      ifTxSpeedChartRef,
      speedRate
    };
  }
}
</script>

<style scoped>
.if-chart {
  height: 90%;
  width: 100%;
}
.if-card {
  height: 520px;
}
</style>