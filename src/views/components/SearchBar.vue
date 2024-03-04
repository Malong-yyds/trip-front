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
    width: 90%;  
    display: flex;  
    align-items: center;  
}  
  
.input-button-container > :first-child 
{  
   
    height: 50px;
}  
  
.input-button-container > :last-child {  

    height: 50px; 
  
}  
  
</style>
  