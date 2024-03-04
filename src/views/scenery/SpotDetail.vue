<template>
    <div class="spot-page">

        <div class="upper-section section">
            <!-- <div class="image-carousel"> -->
            <el-image :src="spot.image_link" alt="景点图片" class="image">
                <!-- <el-carousel-item v-for="(item, index) in images" :key="index">
                        <img :src="item" alt="景点图片">
                    </el-carousel-item> -->
            </el-image>
            <!-- </div> -->
            <div class="spot-info">
                <h2>{{ spot.name }}</h2>
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
            <div class="section">
                <h3>必看贴士</h3>
                <p>{{ spot.tips ? spot.tips : '暂无' }}</p>
            </div>
            <div class="section">
                <div class="comments-button">
                    <h3>用户评价</h3>
                    <el-button @click="showDrawer" :icon="Edit">发表评论</el-button>
                </div>
                <div class="comments">
                    <div v-for="(comment, index) in paginatedComments" :key="index" class="comment">
                        <div class="comment-avatar">
                            <img src="../../assets/user.png" alt="User Avatar" class="avatar" />
                            <p>{{ comment.username }}</p>
                        </div>
                        <div class="comment-info">
                            <div class="comment-header">
                                <div>
                                    <el-rate v-model="comment.rating" disabled show-score text-color="#ff9900"
                                        score-template="{value} 分" />
                                </div>
                            </div>
                            <div class="comment-content">
                                <p>{{ comment.comment_content }}</p>
                            </div>
                            <div class="comment-footer">
                                <div>
                                    <p>{{ comment.time_posted }}</p>
                                </div>
                                <div class="like-info">
                                    <svg @click="handleLike(comment.review_id)" t="1709365915896" class="like-icon"
                                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5743"
                                        id="mx_n_1709365915897" width="200" height="200">
                                        <path
                                            d="M507.733333 827.733333c-72.533333 0-140.8 4.266667-204.8 4.266667-21.333333 0-38.4-17.066667-38.4-38.4v-256c0-21.333333 17.066667-38.4 38.4-38.4h320c8.533333 0 21.333333 4.266667 25.6 12.8 8.533333 8.533333 8.533333 21.333333 12.8 25.6 12.8 106.666667-34.133333 268.8-34.133333 268.8 0 8.533333-4.266667 12.8-4.266667 12.8-4.266667 0-8.533333 4.266667-17.066666 4.266667h-64c-8.533333 4.266667-21.333333 4.266667-34.133334 4.266666z"
                                            fill="#F5CB2B" p-id="5744"></path>
                                        <path
                                            d="M285.866667 964.266667v-59.733334h473.6c4.266667 0 12.8-4.266667 12.8-12.8l102.4-422.4c4.266667-21.333333 0-38.4-4.266667-46.933333H512l8.533333-34.133333c8.533333-42.666667 17.066667-81.066667 17.066667-123.733334V213.333333c0-21.333333 0-42.666667-12.8-68.266666-4.266667-8.533333-8.533333-17.066667-21.333333-21.333334-8.533333-4.266667-17.066667-8.533333-25.6-8.533333-4.266667 0-8.533333 0-12.8 4.266667-8.533333 4.266667-8.533333 8.533333-12.8 12.8 0 4.266667-4.266667 12.8-8.533334 29.866666-4.266667 12.8-4.266667 12.8-4.266666 21.333334l-4.266667 17.066666c-4.266667 12.8-4.266667 25.6-8.533333 38.4 0 8.533333-4.266667 17.066667-21.333334 55.466667v21.333333c-4.266667 12.8-4.266667 17.066667-8.533333 29.866667-8.533333 17.066667-17.066667 34.133333-29.866667 55.466667l-8.533333 17.066666-72.533333 4.266667-4.266667-59.733333 42.666667-4.266667c8.533333-12.8 12.8-25.6 17.066666-34.133333 4.266667-12.8 8.533333-17.066667 8.533334-25.6l8.533333-25.6c12.8-34.133333 17.066667-42.666667 17.066667-51.2 8.533333-12.8 8.533333-25.6 12.8-34.133334V170.666667c0-4.266667 0-8.533333 4.266666-17.066667 8.533333-25.6 8.533333-38.4 17.066667-51.2 4.266667-8.533333 12.8-25.6 38.4-34.133333 12.8-4.266667 25.6-8.533333 42.666667-8.533334s34.133333 8.533333 51.2 17.066667c25.6 12.8 34.133333 34.133333 42.666666 42.666667 17.066667 29.866667 25.6 64 21.333334 98.133333v51.2c0 34.133333-4.266667 64-12.8 98.133333h281.6c17.066667 0 38.4 8.533333 46.933333 25.6 17.066667 21.333333 21.333333 59.733333 12.8 93.866667l-102.4 422.4c-8.533333 34.133333-38.4 55.466667-68.266667 55.466667H285.866667z"
                                            fill="#6A3906" p-id="5745"></path>
                                        <path
                                            d="M290.133333 964.266667H132.266667c-25.6 0-46.933333-21.333333-46.933334-46.933334V409.6c0-25.6 21.333333-46.933333 46.933334-46.933333h157.866666v601.6z m-145.066666-59.733334h89.6V422.4H145.066667v482.133333z"
                                            fill="#6A3906" p-id="5746"></path>
                                    </svg>
                                    <span>{{ comment.like_count }}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <el-drawer v-model="drawer" direction="btt">
                <PostReview :msg="attId"></PostReview>
            </el-drawer>

    

            <el-pagination @current-change="handlePageChange" :current-page="currentPage" :page-size="pageSize"
                :total="totalComments" layout="prev, pager, next" hide-on-single-page></el-pagination>

        </div>
    </div>
</template>  
    
<script setup lang="ts">
import PostReview from "./components/PostReview.vue";
import { attractionDetail, reviewLike } from '/@/api';
import { useStore } from "/@/store/modules/user";
import { Edit } from '@element-plus/icons-vue'
const store = useStore()
const route = useRoute()
const drawer = ref(false)
const attId = ref(Number(route.query.id))


const showDrawer = () => {
    drawer.value = true
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
    reviews: []
})
const pageSize = ref(5);
const currentPage = ref(1);
const totalComments = ref(0);
const getData = () => {
    attractionDetail({ attId: Number(route.query.id) }).then(res => {
        //  Object.assign() 会将这些额外的属性也复制到 spot 中
        Object.assign(spot, res.data)
        totalComments.value = res.data.reviews.length
    }).catch(e => {
        console.log(e);

    })
}
onMounted(() => {
    getData()
})

// const addLike=(id:number)=>{
//     reviewLike(id).then(res=>{
//         console.log(res);
//         // ElMessage({

//         // })
//     }).catch(e=>{
//         console.log(e);

//     })
// }
const handleLike = (id: number) => {
    reviewLike({ reviewId: id }).then(res => {
        getData()
    }).catch(e => {
        console.log(e);

    })
}

// 计算属性，用于分页显示评论  
const paginatedComments = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return spot.reviews.slice(start, end);
});

// 处理分页变化  
const handlePageChange = (newPage: number) => {
    currentPage.value = newPage;
    console.log('new', newPage);

};
</script>  
    
<style scoped> .spot-page {
     display: flex;
     flex-direction: column;
     width: 100%;
     margin: 0 auto;

     padding: 20px;
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
     width: 100%;
     padding: 20px;
     /* 添加底部间距 */
     margin-bottom: 20px;

 }

 .image {
     flex: 1;
     margin-right: 20px;

 }

 .spot-info {
     flex: 1;
     max-width: 50%;
     /* 根据需要调整信息区域的宽度 */
     display: flex;
     flex-direction: column;
     align-items: flex-start;

 }

 .spot-info h2 {
     font-size: 25px;
     margin-bottom: 5px;
     font-weight: bold;
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


 .section:last-child {
     border-bottom: none;
     /* 最后一个部分不需要分隔线 */
     margin-bottom: 0;
     /* 最后一个部分不需要外边距 */
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

 .comment {
     display: flex;
     padding: 10px;
     border-bottom: 1px solid #ddd;
 }


 .comment-avatar {
     width: 50px;
     display: flex;
     flex-direction: column;
     align-items: center;
     margin-top: 10px;
 }

 .avatar {
     margin-bottom: 5px;
     width: 100%
 }

 .comment-info {
     flex: 1;
     padding: 0 20px;
 }

 .comment-header {
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 5px;
 }

 .comment-content {
     font-size: 16px;
     line-height: 1.5;
     padding: 10px;
 }

 .comment-footer {
     display: flex;
     justify-content: space-between;
     align-items: center;
     font-size: 12px;
 }

 .like-info {
     display: flex;
     align-items: center;

 }

 .like-icon {
     margin-right: 5px;
     width: 20px;
     height: 20px;
 }</style>