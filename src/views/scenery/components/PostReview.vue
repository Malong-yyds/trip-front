<template>
    <div class="content">
        <el-form :model="form">
            <el-form-item label="总体评分">
                <el-rate v-model="form.rating" :texts="['不推荐', '失望', '正常', '好', '棒极了']" show-text allow-half />
            </el-form-item>
            <el-form-item label="点评内容">
                <el-input v-model="form.content" autocomplete="off" type="textarea" />
            </el-form-item>
            <el-form-item label="上传图片">
                <el-upload v-model:file-list="form.image_paths" :limit="3" :on-exceed="handleExceed"
                    :before-upload="beforeUpload" :on-success="handleUploadSuccess" list-type="picture-card"
                    :auto-upload="false"> <el-icon>
                        <Plus />
                    </el-icon></el-upload>
                <!-- 图片预览对话框 -->
                <el-dialog :visible.sync="dialogVisible" width="30%">
                    <img width="100%" :src="dialogImageUrl" alt="预览图片">
                </el-dialog>
            </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">

            <el-button type="primary" :loading="loading" @click="onClick">{{
            loading ? '发表中 ...' : '发表'
                }}</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { postReview } from '/@/api';
import { useStore } from '/@/store/modules/user';
import { Plus } from '@element-plus/icons-vue'

const store = useStore()
const props = defineProps({
    msg: {
        type: Number,
        required: true,
    },
});

const loading = ref(false)

const form = ref({
    attId: props.msg,
    userId: store.userId as unknown as number,
    rating: 0, 
    content: '',
    image_paths: []
})

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleExceed = (files: any, fileList: any) => {
    ElMessage({
        type: 'warning', message: `当前限制选择 3 张图片，本次选择了 ${files.length} 张图片，共选择了 ${fileList.length} 张图片`
    })
};
const beforeUpload = (file: any) => {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJPG && !isPNG) {
        ElMessage({
            type: 'error', message: '上传图片只能是 JPG/PNG 格式!'
        })
    }
    if (!isLt2M) {
        ElMessage({
            type: 'error', message: '上传图片大小不能超过 2MB!'
        })
    }
    return isJPG || isPNG && isLt2M;
};
const onClick = async () => {
    loading.value = true
    const formData = new FormData();
    formData.append('attId', form.value.attId);
    formData.append('userId', form.value.userId);
    formData.append('rating', form.value.rating);
    formData.append('content', form.value.content);
    // console.log('click',form,form.value,form.value.image_paths);
    
    form.value.image_paths.forEach((image, index:number) => {
        formData.append(`image_paths[${index}]`, image.raw);
    });
    await postReview(form.value).then(res => {
        console.log('form', form.value); 
        loading.value = false
        if(res.code==200){
            ElMessage({
                type:'success',
                message:'发布成功'
            })
            form.value.rating=0
            form.value.content=''
            form.value.image_paths=[]
        }
    }).catch(e => {
        console.log(e);
    })
}
const handleUploadSuccess = (response:any) => {
    if (response && response.url) {
        form.value.image_paths.push({ url: response.url });
        dialogImageUrl.value = response.url;
        dialogVisible.value = true;
    }
};

</script>

<style scoped>
.content {
    padding-left: 50px
}
</style>