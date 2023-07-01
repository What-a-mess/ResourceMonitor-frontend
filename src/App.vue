<template>
  <el-container class="thecontainer">
    <el-header id="header">
      <div style="text-align: left; padding-left: 1em;"><h1>资源监视器</h1></div>
    </el-header>
    <el-container>
      <el-aside class="side-bar">
        <el-menu
          default-active="2"
          :router="true"
        >
          <el-menu-item index="/cpu">CPU信息</el-menu-item>
          <el-menu-item index="/mem">
            <span>内存信息</span>
          </el-menu-item>
          <el-sub-menu index="/disk">
            <template #title>
              <span>磁盘信息</span>
            </template>
            <el-menu-item
              v-for="info, i in store.diskInfo" 
              :key="i"
              :index="'/disk/'+info.hashcode">{{ info.name }}</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/if">
            <template #title>
              <span>网卡信息</span>
            </template>
            <el-menu-item
              v-for="info, i in store.ifInfo" 
              :key="i"
              :index="'/if/'+info.hashcode">
              <span style="display: block; width: 90%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{ info.name+'：'+info.displayName }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/fs">
            <span>存储信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <div id="content"><router-view/></div>
    </el-container>
    <a id="downloadAnchorElem" style="display:none"></a>
    <el-button type="primary" :icon="Plus" circle class="save-button" />
    <el-button type="primary" :icon="Download" circle class="dump-button" @click="dumpStorageJson" />
    <el-button type="primary" :icon="Upload" circle class="upload-button" />
  </el-container>
</template>

<script>
import { store } from '@/utils/store';

import {
  Download,
  Upload,
  Plus,
} from '@element-plus/icons-vue'

export default {
  setup() {
    function dumpStorageJson(event) {
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store));
      let dlAnchorElem = document.getElementById('downloadAnchorElem');
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", "status.json");
      dlAnchorElem.click();
    }
    function importData() {
      let input = document.createElement('input');
      input.type = 'file';
      input.onchange = _ => {
        // you can use this method to get file and perform respective operations
                let files = Array.from(input.files);
                console.log(files);
                let reader = new FileReader();
                reader.readAsText(files[0], "UTF-8");
                reader.onload = (event) => {
                  let fileString = event.target.result;
                  let storageObj = JSON.parse(fileString)
                }
            };
      input.click();
      
    }
    return {
      store,
      Download, Upload, Plus,
      dumpStorageJson
    };
  }
};
</script>

<style>
thecontainer {
  height: 100%;
}
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
}
#content {
  position: absolute;
  right: 0;
  top: 0;
  margin: 0 0;
  left: max(150px, 10%);
  padding: 100px 5%;
  bottom: 0;
  overflow-y: scroll;
}
#header {
  height: 75px;
  padding: auto;
  background-color:rgba(255, 255, 255, 0.8z);
  backdrop-filter: blur(20px);
  /* box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2); */
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: var(--el-border-color);
  z-index: 100;
  position: relative;
}
.side-bar {
  display: block;
  position: absolute;
  left: 0;
  top: 75px;
  bottom: 0;
  min-width: 150px;
  width: 10%;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  min-height: calc(100hv);
  border-right-style: solid;
  border-right-color: var(--el-border-color);
  border-right-width: 1px;
}
.el-menu {
  border-style: hidden !important;
}
.save-button {
  position: absolute;
  right: 50px;
  bottom: 30px;
  height: 60px;
  width: 60px;
  font-size: x-large;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.4)
}
.dump-button {
  position: absolute;
  right: 50px;
  bottom: 110px;
  height: 60px;
  width: 60px;
  font-size: x-large;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.4)
}
.upload-button {
  position: absolute;
  right: 50px;
  bottom: 190px;
  height: 60px;
  width: 60px;
  font-size: x-large;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.4)
}
</style>
