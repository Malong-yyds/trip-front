<template>
    <div class="cuisine">

        <el-card style="width: 200px" v-for="item in cuisineData">

            <img :src="item.img" class="cuisine-image" alt="alt"/>
            <template #footer>
                <span><b>{{ item.name }}</b></span>
                <p><el-tag type="primary" v-if="item.label">{{item.label}}</el-tag></p>
            </template>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { getFood } from '/@/api';
interface cuisineItem{
name:string,
img:string,
label:string
}
const props = defineProps({
    msg: {
        type: Number,
        required: true,
    }
})


const attId = ref(props.msg)
const cuisineData=ref<cuisineItem[]>([])
const getData = () => {

    getFood(attId.value).then(res => {
        console.log(res);
        cuisineData.value=res.data
    }).catch(e => {
        console.log(e);

    })
}

onMounted(() => {
    getData()
})


watch(props, (newValue) => {
    attId.value = newValue.msg
    getData()

})
</script>

<style scoped>
.cuisine {  
    display: flex;  
    flex-direction: row;  
    justify-content: space-between;  
    text-align: center;
}  
  
.cuisine-image {  
    width: 100%; 
    height: 100px; /* 保持图片的原始宽高比 */  
    /* object-fit: cover;    */
}
</style>