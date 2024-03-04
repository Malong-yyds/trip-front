<template>  
  <div >  
    <div class="logo-container">  
      <span>粤史之旅推荐系统</span>  
    </div>  
    <div class="user-container">  
      <el-avatar @click="goToProfile">  
        {{ userInfo }}  
      </el-avatar>
      <!-- 欢迎   {{ userInfo }}   -->
      <el-button
      text
      class="font-small"
      @click="handleLogin"
      >{{ buttonText }}</el-button
    > 
    </div>  
  </div> 
</template>  
  
<script setup lang="ts">   

import { useStore } from '/@/store/modules/user';  
 
const store = useStore();  
const router = useRouter();  
  
const userInfo = ref(store.username || '游客');  
const buttonText = computed(() => store.isLoggedIn ? '退出' : '登录'); // 根据用户信息状态设置按钮文本  
  
// 处理点击头像跳转到个人信息页面  
const goToProfile = () => {  
  // router.push({ name: 'Profile' }); // 假设'Profile'是个人信息页面的路由名称  
};  
  
// 处理点击登录/退出按钮  
const handleLogin = () => {  
  if (store.isLoggedIn) {  
    // 用户已登录，执行退出操作  
    store.logout() 
      ElMessage({  
        message: '已退出'  
      });  
      userInfo.value = '游客';  
      router.push('/');
  } else {  
    // 用户未登录，执行登录操作  
    router.push({ name: 'login' });  
  }  
};  
 
  
</script>  
  
<style scoped>  
.logo-container {  
  float: left;  
  padding: 0 20px;  
}  
  
.user-container {  
  float: right;  
  padding: 10px 20px; 
  font-size: 20px; 
}  
  
.username {  
  display: inline-flex;  
  align-items: center;  
  cursor: pointer;  
}  
  
.el-avatar {  
  vertical-align: middle; 
  margin-right:10px; 
 /* background-color: #f19738; */
}  
.font-small {  
  font-size: 14px; 
}  
</style>