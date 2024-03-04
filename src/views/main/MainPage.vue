<script setup lang="ts">
import MainHeader from '../components/MainHeader.vue'
import SearchBar from '../components/SearchBar.vue';
import SideBar from '../components/SideBar.vue';

</script>


<template>
  <div class="common-layout">
    <el-container>

      <el-header>
        <MainHeader></MainHeader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <SideBar /> 
        </el-aside> 
        <el-main>
          <div class="container">
            <div class="search-box">
              <SearchBar />
            </div>
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.search-box {
  margin: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.map-box {
  flex: 1;
}</style>
