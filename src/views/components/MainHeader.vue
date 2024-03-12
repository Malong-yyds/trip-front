<template>

  <div class="container">
    <div class="logo-container">
      <h2>粤红之旅推荐系统</h2>
    </div>
    <div class="search-box">
      <SearchBar />
    </div>
    <div class="user-container">
      <el-avatar @click="goToProfile">
        {{ userInfo }}
      </el-avatar>
      <el-button text class="font-small" @click="handleLogin">
        {{ buttonText }}
      </el-button>
    </div>
  </div>

</template>

<script setup lang="ts">

import { useStore } from '/@/store/modules/user';
import SearchBar from './SearchBar.vue';
const store = useStore();
const router = useRouter();

const userInfo = ref(store.username || '游客');
const buttonText = computed(() => store.isLoggedIn ? '退出' : '登录'); // 根据用户信息状态设置按钮文本  

// 处理点击头像跳转到个人信息页面  
const goToProfile = () => {
  if(store.username){
 router.push({ name: 'profile' });
  }

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
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}



.search-box {
  width: 35%;
  margin-left: 50px;
}


.username {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.el-avatar {
  vertical-align: middle;
  margin-right: 10px;
}

.font-small {
  font-size: 14px;
}
</style>
