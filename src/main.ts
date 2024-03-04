import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia  from './store' 
// import './assets/css/index.css'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App) 

app.use(ElementPlus)
app.use(pinia)
// 获取基础数据
// await useStore().getData()

app.use(router).mount('#app')
