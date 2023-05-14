<template>
  <el-container class="thecontainer">
    <el-header class="header">Header</el-header>
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
  #app, .el-container {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  #content {
    margin: 0;
    padding: 50px 5%;
    height: 100%;
    width: 100%;
  }
  .header {
    height: 75px;
    padding: auto;
    background-color:tomato;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 1px;
    z-index: 100;
    position: relative;
  }
</style>
