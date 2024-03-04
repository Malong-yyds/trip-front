
<template>
    <div class="content">
        <el-form :model="form">
            <el-form-item label="总体评分">
                <el-rate v-model="form.rating" :texts="['不推荐', '失望', '正常', '好', '棒极了']" show-text />
            </el-form-item>
            <el-form-item label="点评内容">
                <el-input v-model="form.content" autocomplete="off"  type="textarea"/>
            </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
            <!-- <el-button @click="cancelForm">取消</el-button> -->
            <el-button type="primary" :loading="loading" @click="onClick">{{
                loading ? '发表中 ...' : '发表'
            }}</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { postReview } from '/@/api';
import { useStore } from '/@/store/modules/user';


const store = useStore()
const props = defineProps({
    msg: {
        type: Number,
        required: true,
    },
});


const loading = ref(false)

const form = reactive({
    attId: props.msg,
    userId: store.userId as unknown as number,
    rating: 0,
    content: ''


})

const onClick = async () => {

    loading.value = true
    await postReview(form).then(res => {
        console.log(res);
        loading.value = false
    }).catch(e => {
        console.log(e);

    })
}
const cancelForm = () => {
    loading.value = false
    form.content = ''
    form.rating = 0

}
</script>

<style scoped>

.content{
    padding-left: 50px
}
</style>