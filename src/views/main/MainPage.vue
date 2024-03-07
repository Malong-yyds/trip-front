
<template>
  <el-container style=" display: flex;">

    <el-header style="height: 70px;  background-color: #F8961E; color: #fff;">
      <MainHeader></MainHeader>
    </el-header>

    <el-container style="display: flex;flex-direction: row;">
      <el-aside width="12%">
        <SideBar/>
      </el-aside>
     
      <el-main>
        <router-view></router-view>
      </el-main>
     <RecommendBar  style="flex: 1; "></RecommendBar>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import MainHeader from '../components/MainHeader.vue'
import RecommendBar from '../components/RecommendBar.vue';
import SideBar from '../components/SideBar.vue';

</script>


<style scoped>
.el-container {
  display: flex;
  flex-direction: column;
}

.el-aside,
/* .el-divider, */
.el-main {
  height: calc(98vh - 80px);
}
.el-main{
  width: 50%;
}
</style>