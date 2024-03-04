<template>
  <div class="login-container">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="12">
        <!-- 左边图片部分 -->
        <div class="login-image">
          <img src="../../assets/logo.png" alt="Login Image" />
        </div>
      </el-col>
      <el-col :span="12">
        <!-- 右边表单部分 -->
        <LoginCard />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import LoginCard from './components/LoginCard.vue';  
</script>

<style scoped>  
.login-container {  
  display: flex;  
  justify-content: center;  
  align-items: center;  
  height: 100vh;  
  background-color: #efefef;  
}  
  
.login-container > .el-col {  
  display: flex;  
  justify-content: center;  
  align-items: center;  
}  
  
.login-image,  
.login-card {  
  height: 50vh; /* 设置相同的高度 */  
  display: flex;  
  justify-content: center;  
  align-items: center; 
 
}  
  
.login-image img {  
  width: 100%;  
  height: 100%;  
  object-fit: cover; /* 保持图片的宽高比，同时填充整个容器 */  
}  
</style>