<template>
  <el-row>
    <el-col :span="18" :offset="3">
      <div>
        <title-card style="text-align: center;">
          <div class="fs-info-container">
            <title-card v-for="info, i of fsInfo" class="fs-info-card" :haveShadow="false">
              <div :ref="(el) => {setfsInfoChartRefs(el, info.hashcode)}"></div>
            </title-card>
          </div>
        </title-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import TitleCard from '@/components/TitleCard.vue';
import { store } from '@/utils/store';
import { getCurrentInstance, onMounted, ref } from 'vue';

export default {
  components: {
    TitleCard
  },
  setup() {
    const fsInfoChartRefs = new Map();
    let fsInfo = ref(store.fsInfo);
    const { proxy } = getCurrentInstance();

    const setfsInfoChartRefs = (el, refId) => {
      if (el) {
        fsInfoChartRefs.set(refId, el);
      }
    };

    let fsInfoChartOpt = {
      series: {
        type: 'pie',
        radius: '70%',
        data: [],
      }
    };

    onMounted(() => {
      setInterval(() => {
        fsInfo.value = store.fsInfo;
        let fsInfoMap = store.fsInfoMap;
        for (let key of fsInfoChartRefs.keys()) {
          if (map)
        }
      }, 1000);
    })

    return {
      setfsInfoChartRefs,
      fsInfo,
      store
    };
  }
};
</script>

<style>
.fs-info-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 40%), max-content));
  justify-content: center;
  padding: 0;
}
.fs-info-card {
  margin: 0 5%;
  max-width: 300px;
  height: 250px;
}
</style>