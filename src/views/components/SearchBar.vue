<template>
    <div class="input-button-container">
        <el-input v-model="keyword" placeholder="请输入关键词"></el-input>
        <el-button type="primary" @click="handleSearch(keyword)">查找</el-button>
    </div>
</template>
  
<script lang="ts" setup>

const keyword = ref('')

const router=useRouter()
const handleSearch=(keyword:string)=>{
router.push({'name':'SceneryPage',query:{keyword}})
}
</script>

<style scoped>
.input-button-container {  
    /* margin: 20px 5px 0 5px; */
    display: flex;  
    /* align-items: center;   */
}  
  
.el-button--primary {
    --el-button-bg-color: #f56610;
    --el-button-border-color: #f56610;
    --el-button-outline-color: #f56610;
}
.input-button-container > :first-child 
{  
   
    height: 35px;
}  
  
.input-button-container > :last-child {  

    height: 35px; 
  
}  
  
</style>
  