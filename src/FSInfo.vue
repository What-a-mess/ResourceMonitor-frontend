<template>
  <div>
    <h1>存储信息</h1>
    <el-row>
      <el-col :span="24" :offset="0">
        <div>
          <title-card title="文件系统信息">
            <div class="fs-info-container">
              <title-card v-for="info, i of fsInfo" :title="info.name" class="fs-info-card" :haveShadow="false">
                <div class="usage-graph-container">
                  <el-progress :percentage="(info.spaceUsage*100).toFixed(1)" type="circle" :color="getColor"></el-progress>
                </div>
                <div class="fs-info-card-body">
                  <p>
                    <span style="font-size: x-large; font-weight: 400;">{{ formatStorage(info.usedSpace) }}</span>
                      / 
                    <span>{{ formatStorage(info.totalSpace) }}</span>
                  </p>
                  <p>文件系统：{{ info.type }}</p>
                </div>
              </title-card>
            </div>
          </title-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TitleCard from '@/components/TitleCard.vue';
import { store } from '@/utils/store';
import { getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue';

export default {
  components: {
    TitleCard
  },
  setup() {
    const fsInfoChartRefs = new Map();
    let fsInfo = ref(store.fsInfo);
    const { proxy } = getCurrentInstance();
    let updateTimer = '';

    const getColor = (percentage) => {
      const blueColor = "0x20a0ff";
      const redColor = "0xf56c6c";
      if (percentage <= 90) return '#20a0ff';
      // 蓝色到红色不能用RGB直接线性插值呢~
      // else {
      //   let delta = (percentage-80) / (100-80);
      //   return '#' + eval(parseInt(eval(blueColor)*(1-delta) + eval(redColor)*delta)).toString(16);
      // }
      else return '#f56c6c';
    };

    const formatStorage = (storageSize) => {
      let suffix = ['B', 'KB', 'MB', 'GB', 'TB'];
      let i = 0;
      while (storageSize > 1024) {
        storageSize /= 1024
        i++;
      }
      return storageSize.toFixed(1) + ' ' + suffix[i];
    }

    onMounted(() => {
      updateTimer = setInterval(() => {
        fsInfo.value = store.fsInfo;
      }, 1000);
    });
    onBeforeUnmount(() => {
      clearInterval(updateTimer);
    })

    return {
      fsInfo,
      fsInfoChartRefs,
      getColor,
      formatStorage,
      store
    };
  }
};
</script>

<style>
.fs-info-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(350px, 30%), max-content));
  justify-content: center;
  padding: 0;
}
.fs-info-card {
  margin: 0 5%;
  width: 90%;
  transition: box-shadow 0.15s;
}
.fs-info-card:hover {
  transition: box-shadow 0.15s;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
}
.usage-graph-container {
  text-align: center;
  padding-bottom: 1.75rem;
  border-bottom-style: solid; 
  border-bottom-width: 1px;
  border-color: var(--el-border-color);
}
.fs-info-card-body {
  text-align: right;
}
.fs-info-card-body > h3 {
  font-weight: 600 !important;
  color: #a0a2a6;
}
</style>