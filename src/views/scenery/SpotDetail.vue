<template>
    <div class="spot-page">

        <div class="upper-section section">
            <el-image :src="spot.image_link" alt="景点图片" class="image">
            </el-image>

            <div class="spot-info">
                <h2><a target="_blank" :href="getMapUrl(spot.name)">{{ spot.name }}</a></h2>
                <p><b>评分:</b> {{ spot.average_score ? spot.average_score : '暂无评' }}分</p>
                <p><b>地址:</b> {{ spot.address }}</p>
                <p><b>开放时间:</b> {{ spot.opening_hours ? spot.opening_hours : '具体以现场为准' }}</p>
                <p><b>官方电话: </b>{{ spot.official_phone ? spot.official_phone : '暂无' }}</p>
            </div>
        </div>

        <div class="lower-section">
            <div class="section">
                <h3>景点详情</h3>
                <p>{{ spot.description }}</p>
            </div>
            <div class="section" v-if="spot.tips">
                <h3>必看贴士</h3>
                <p>{{ spot.tips }}</p>
            </div>
            <div class="section">
                <div class="comments-button">
                    <h3>用户评价</h3>
                    <el-button @click="showDrawer" :icon="Edit">发表评论</el-button>
                </div>
                <UserReview :msg="attId"></UserReview>

            </div>
            <el-drawer v-model="drawer" direction="btt" size="46%">
                <PostReview :msg="attId"></PostReview>
            </el-drawer>

        </div>
    </div>
</template>

<script setup lang="ts">
import PostReview from "./components/PostReview.vue";
import { attractionDetail } from '/@/api';
import { Edit } from '@element-plus/icons-vue'
import UserReview from "./components/UserReview.vue";
import { useStore } from '/@/store/modules/user';

const route = useRoute()
const store = useStore()
const drawer = ref(false)
const attId = ref(Number(route.query.id))

const showDrawer = () => {

    if (!store.isLoggedIn) {
        // 如果用户未登录，提示用户登录  
        alert('请先登录');
        router.push('/login');
    } else {
        drawer.value = true
    }

}
const spot = reactive({
    name: null,
    image_link: null,
    address: null,
    average_score: null,
    review_count: null,
    opening_hours: null,
    official_phone: null,
    description: null,
    tips: null,
})

const getData = () => {
    attractionDetail({ attId: Number(route.query.id) }).then(res => {
        //  Object.assign() 会将这些额外的属性也复制到 spot 中
        Object.assign(spot, res.data)
    }).catch(e => {
        console.log(e);

    })
}
onMounted(() => {
    getData()
})

// 监听路由参数的变化，并在变化时更新 attId  
watch(() => route.query.id, (newVal) => {
    attId.value = Number(newVal);
    getData()

});

const getMapUrl = (name: string) => {
    return `https://ditu.amap.com/search?query=${encodeURIComponent(name)}`;
}
</script>

<style scoped>
 .spot-page {
     display: flex;
     flex-direction: column;
     width: 100%;
     /* margin: 0 auto; */
     padding: 0 50px;
     box-sizing: border-box;
     text-align: left;
 }

 .upper-section {
     display: flex;
     align-items: flex-start;

 }

 .section {
     border: 1px solid #c6e2ff17;
     background-color: #c6e2ff17;
     width: 90%;
     padding: 50px;

     margin-bottom: 20px;

 }

 .image {
     flex: 1;
     margin-right: 20px;

 }

 .spot-info {
     flex: 1;
     max-width: 50%;
     display: flex;
     flex-direction: column;
     align-items: flex-start;

 }

 .spot-info h2 {
     font-size: 25px;
     margin-bottom: 5px;
     font-weight: bold;
 }

 .spot-info h2 a {
     text-decoration: none;
     color: inherit
 }

 .spot-info p {
     font-size: 16px;
     margin-bottom: 10px;
 }

 .lower-section {
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     /* padding:0 20px; */
 }

 .lower-section h3 {
     font-family: PingFangSC-Medium;
     font-size: 20px;
     color: #151313;
     line-height: 20px;
     font-weight: bold;
     margin: 16px 0 10px 0;
 }

 .comments-button {
     display: flex;
     flex-direction: row;
     justify-content: space-between;
 }

 .comments {
     display: flex;
     margin-bottom: 10px;
     flex-direction: column;
     padding: 10px;
 }
</style>