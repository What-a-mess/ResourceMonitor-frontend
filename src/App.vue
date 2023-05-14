<script setup>
</script>

<template>
  <el-container class="thecontainer">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
        >
          <el-menu-item index="1">Option 1</el-menu-item>
          <el-menu-item index="2">Option 2</el-menu-item>
        </el-menu>
      </el-aside>
      <div id="content"><router-view style="height: 100%; width: 100%;"/></div>
    </el-container>
  </el-container>
</template>

<style>
  thecontainer {
    height: 100%;
  }
  #app,.el-container {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  #content {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
</style>
