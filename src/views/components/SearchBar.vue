<template>
    <div>
        <div class="input-button-container">
            <el-input v-model="keyword" placeholder="请输入关键词" @keyup.enter="handleSearch"></el-input>
            <el-button type="primary" @click="handleSearch(keyword)">查找</el-button>
        </div>
        <div>
            <a @click="handleGroup(1,'亲子活动')">亲子活动</a> <a @click="handleGroup(2,'班级团建')">班级团建</a> <a @click="handleGroup(3,'企业团聚')">企业团聚</a>
        </div>
    </div>
</template>

<script lang="ts" setup>

const keyword = ref('')

const router = useRouter()
const handleSearch = (keyword: string) => {
    if (!keyword.trim()) {
        alert('请输入有效的关键词！');
        return; // 阻止路由跳转  
    }
    router.push({ 'name': 'SceneryPage', query: { keyword } })
}


const handleGroup = (id: number,name:string) => {

    router.push({ 'name': 'GroupSpot', query: { id:id,name:name } })
}
</script>

<style scoped>
.input-button-container {
    display: flex;
}

.el-button--primary {
    --el-button-bg-color: #70abcf;
    --el-button-border-color: #70abcf;
    --el-button-outline-color: #70abcf;
}

.input-button-container> :first-child {

    height: 35px;
}

.input-button-container> :last-child {

    height: 35px;

}
</style>