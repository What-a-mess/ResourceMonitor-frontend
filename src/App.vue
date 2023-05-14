<template>
  <el-container class="thecontainer">
    <el-header id="header">Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          :router="true"
        >
          <el-menu-item index="/">Option 1</el-menu-item>
          <el-menu-item index="/cpu">CPU信息</el-menu-item>
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
              :index="'/if/'+info.hashcode">{{ info.name }}</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <div id="content"><router-view/></div>
    </el-container>
  </el-container>
</template>

<script>
import { store } from '@/utils/store';

export default {
  setup() {
    return {
      store
    };
  }
};
</script>

<style scoped>
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
    left: 200px;
    padding: 100px 5%;
    bottom: 0;
    overflow-y: scroll;
  }
  #header {
    height: 75px;
    padding: auto;
    background-color:rgba(255, 255, 255, 0);
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
  }
</style>
