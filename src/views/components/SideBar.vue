
<template> 
<div class="side">
  <el-menu  
    :default-active="activeIndex"
    @select="handleSelect"  
  >  
  <el-menu-item index="0">  
      <template #title>  
      
      <el-icon><House /></el-icon>
        <span>首页</span>  
      </template>  
    </el-menu-item> 
 
    <el-menu-item index="1">  
      <template #title>  
        <el-icon><Star /></el-icon>
        <span> 红色革命 </span>  
      </template>  
    </el-menu-item>  
    <el-menu-item index="2">  
      <template #title>  
        <el-icon><Aim /></el-icon>
        <span>文化艺术</span> 
       
      </template>  
    </el-menu-item>  
    <el-menu-item index="3">  
      <template #title>  

      <el-icon><OfficeBuilding /></el-icon>
        <span>建筑遗址</span>  
      </template>  
    </el-menu-item>  
    <el-menu-item index="4">  
      <template #title>  
        <el-icon><Discount /></el-icon>
        <span> 宗教信仰</span>  
      </template>  
    </el-menu-item>  
  </el-menu> 
</div> 
</template>  
  
<script setup lang="ts">  
import { useRouter } from 'vue-router';  
import {House,Star,Aim,OfficeBuilding,Discount } from "@element-plus/icons-vue";
 
// 获取路由实例  
const router = useRouter();  
const activeIndex=ref('0') 

const handleSelect = (index:string ) => {
  activeIndex.value=index  
  if (index === '0') {  
    router.push('/')
  } else {
    router.push({name:'SceneryPage',query:{index}});  
  } 
   
};  
</script>
<style>
.side{
  width:100%;
  height:100vh;
  margin: 20px 0  0 20px;

}
.el-menu {  
  height: 100%;
  /* font-size: 30px; */
}
.el-menu-item {  
  font-size: 30px;
}

</style>