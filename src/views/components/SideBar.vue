
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
        <span> 人物故居 </span>  
      </template>  
    </el-menu-item>  
    <el-menu-item index="2">  
      <template #title>  
        <el-icon><Aim /></el-icon>
        <span>革命旧址</span> 
       
      </template>  
    </el-menu-item>  
    <el-menu-item index="3">  
      <template #title>  

      <el-icon><OfficeBuilding /></el-icon>
        <span>抗战足迹</span>  
      </template>  
    </el-menu-item>   
  </el-menu> 
</div> 
</template>  
  
<script setup lang="ts">  
import { useRouter } from 'vue-router';  
import {House,Star,Aim,OfficeBuilding } from "@element-plus/icons-vue";
 
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
padding-left: 30px;
border-right: 1px solid #ddd;  
height: 100%;
}
.el-menu 
.el-menu-item {  
  font-size: 20px;
}
.el-menu .el-menu-item.is-active {
    color: #f8961e;
}
.el-menu {  
  border-right: none !important;  
}
</style>