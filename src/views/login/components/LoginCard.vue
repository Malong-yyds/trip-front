
<template>
  <el-card class="login-card h-60 w-96 md:rounded-lg" shadow="never">

    <div class="card-header">
      <h3>粤史之旅推荐系统</h3>
    </div>
    <div class="main">
      <el-form ref="formRef" :model="loginForm" label-width="0">
  
        <el-form-item class="mt-2">
          <el-input v-model="loginForm.username" placeholder="请输入用户名">
            <template #prepend>
              <span class="w-11 text-center inline-block">用户名</span>
            </template>
          </el-input></el-form-item>

        <el-form-item  class="mt-2">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password">
            <template #prepend>
              <span class="w-11 text-center inline-block">密码</span></template>
          </el-input>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button type="primary" class="w-full left-button" size="default" @click="handleLogin">登录</el-button>
          <el-button type="primary" class="w-full right-button" size="default" @click="handleRegister">注册</el-button>
        
        </el-form-item>

      </el-form>

    </div>
  </el-card>
</template>
<script setup lang="ts">

import { login } from '/@/api/index'
import { useStore } from '/@/store/modules/user';

const store = useStore();
const loginForm = reactive({
  username: '',
  password: '',
})
const router=useRouter()
const handleLogin = async () => {

 await login(loginForm).then(res => {

    const token = res.data.token;

    store.loginSuccess(token,loginForm.username,res.data.id);
     // 显示登录成功的消息提示  
     ElMessage ({  
      message: '登录成功',  
      type: 'success',  
      duration: 2000, // 消息显示的时长，单位毫秒  
      showClose: true, // 是否显示关闭按钮  
      
    });  
  
    // 跳转到首页  
    router.push('/');  
  }).catch(e => {
    // 登录失败时也可以显示消息提示  
    ElMessage({  
      message: '登录失败，请检查用户名和密码',  
      type: 'error',  
      duration: 2000,  
      showClose: true,  
      
    });  
    console.log(e);
  })
}

const handleRegister=()=>{
  
}
</script>
<style scoped>
.card-header {  
  margin: 0px 0px 20px 0px; /* 调整为20px以增大头部和内容之间的间距 */  
  font-size: 36px;  
  font-weight: bold;  
  text-align: center;  
}  
  
.main {  
  padding: 30px; /* 设置内容部分的内边距 */  
  display: flex; /* 启用弹性布局 */  
  flex-direction: column; /* 子元素垂直排列 */  
}  
  
.buttons{  
  display: flex; /* 使得按钮水平排列 */  
  justify-content: space-between; /* 按钮之间有空隙，且分别靠左右 */  
}  
  
.left-button, .right-button {  
  flex: 1; /* 使按钮平均分配可用空间 */  
} 
.el-input.w-60 {
  /* width: 60px; */
}
</style>
