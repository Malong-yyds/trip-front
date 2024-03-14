<template>
  <el-card class="login-card h-60 w-96 md:rounded-lg" shadow="never">

    <div class="card-header">
      <h3>粤红之旅推荐系统</h3>
    </div>
    <div class="main">
      <el-form ref="formRef" :model="formData" label-width="0">

        <el-form-item class="mt-2">
          <el-input v-model="formData.username" placeholder="请输入用户名">
            <template #prepend>
              <span class="w-11 text-center inline-block">用户名</span>
            </template>
          </el-input></el-form-item>

        <el-form-item class="mt-2">
          <el-input v-model="formData.password" placeholder="请输入密码" type="password">
            <template #prepend>
              <span class="w-11 text-center inline-block">密码</span></template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="isRegister" class="mt-2">
          <el-input v-model="confirmPassword" placeholder="请再次输入密码" type="password">
            <template #prepend>
              <span class="w-11 text-center inline-block">确认密码</span></template>
          </el-input>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button v-if="!isRegister" type="primary" class="w-full left-button" size="default"
            @click="handleLogin">登录</el-button>
          <el-button v-if="!isRegister" type="primary" class="w-full right-button" size="default"
            @click="goRegister">注册新用户</el-button>
          <el-button v-if="isRegister" type="primary" class="w-full right-button" size="default"
            @click="handleRegister">确定</el-button>
        </el-form-item>

      </el-form>

    </div>
  </el-card>
</template>
<script setup lang="ts">

import { login, register } from '/@/api/index'
import { useStore } from '/@/store/modules/user';

const store = useStore();
const formData = reactive({
  username: '',
  password: '',
})
const confirmPassword = ref('')
const router = useRouter()
const isRegister = ref(false)
const handleLogin = async () => {

  await login(formData).then(res => {

    const token = res.data.token;

    store.loginSuccess(token, formData.username, res.data.id);
    // 显示登录成功的消息提示  
    ElMessage({
      message: '登录成功',
      type: 'success',
      duration: 2000,
      showClose: true, 
    });

    router.push('/');
  }).catch(e => {
  
    ElMessage({
      message: '登录失败，请检查用户名和密码',
      type: 'error',
      duration: 2000,
      showClose: true,

    });
    console.log(e);
  })
}

const goRegister = () => {
  isRegister.value = true
}

const handleRegister = () => {
  if (formData.password !== confirmPassword.value || (formData.password ='')|| (confirmPassword.value ='')) {
    ElMessage({
      message: '注册失败，两次密码不一致，请重新输入',
      type: 'error',
      duration: 2000,
      showClose: true,

    });
    confirmPassword.value = ''
  }
  else {
    register(formData).then(res => {
      console.log(res);
      ElMessage({
        message: '注册成功,跳转登录',
        type: 'success',
        duration: 2000,  
        showClose: true, 
      });
      isRegister.value = false
    }).catch(e => {
      console.log(e);

    })
  }
}
</script>
<style scoped>
.card-header {
  margin: 0px 0px 20px 0px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
}

.main {
  padding: 30px;
  display: flex;
  flex-direction: column;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.left-button,
.right-button {
  flex: 1;
}

</style>
