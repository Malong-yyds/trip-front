<template>
    <div class="spot">

        <el-card style="width: 200px" v-for="item in spotData">

            <img :src="item.image_link.split(';')[0]" class="spot-image" alt="alt"/>
            <template #footer>
               <a @click="handleSpotClick(item.id)"><span><b>{{ item.name  }} </b></span></a> 
                 <el-tag type="success" v-if="item.average_score">{{item.average_score}}</el-tag>
            </template>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { getNearAtt } from '/@/api';
interface spotItem{
id:number,
name:string,
image_link:string,
average_score:number
}
const props = defineProps({
    msg: {
        type: Number,
        required: true,
    }
})

const router=useRouter()
const attId = ref(props.msg)
const spotData=ref<spotItem[]>([])
const getData = () => {

    getNearAtt(attId.value).then(res => {
        console.log(res);
        spotData.value=res.data
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

const handleSpotClick = (id: number) => {
    router.push({
        name: 'SpotDetail',
        query: { id }
    });

};
</script>

<style scoped>
.spot {  
    display: flex;  
    flex-direction: row;  
    justify-content: space-between;  
    text-align: center;
}  
  
.spot-image {  
    width: 100%; 
    height: 100px; /* 保持图片的原始宽高比 */  
    /* object-fit: cover;    */
}
</style>