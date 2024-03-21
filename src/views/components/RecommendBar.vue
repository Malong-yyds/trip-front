<template>
    <div class="recommendation-module">
        <div class="title">热门推荐</div>
        <el-carousel height="200px" trigger="hover">
            <el-carousel-item v-for="item in hotItems" :key="item.attraction_id">
                <div class="carousel-item" @click="handleItemClick(item.attraction_id)">

                    <div class="carousel-img-wrapper">
                        <img :src="item.image_link.split(';')[0]" :alt="item.name" class="carousel-img">
                    </div>
                    <div class="carousel-caption" v-if="item.name">{{ item.name }}</div>
                   
                </div>
            </el-carousel-item>
        </el-carousel>
    
        <div v-if="store.isLoggedIn" class="guess-you-like">
            <div class="title">专属推荐</div>
            <div v-for="item in guessItems" :key="item.id" class="guess-item" @click="handleItemClick(item.id)">
                <div class="guess-img-wrapper">
                    <img :src="item.image_link.split(';')[0]" alt="Guess you like" class="guess-img">
                </div>
                <span class="guess-title">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userRecommend, popularRecommend } from '/@/api';
import { useStore } from '/@/store/modules/user';


const store = useStore();
const router = useRouter()
const hotItems = ref([])
const guessItems = ref([])

const getUserRecommend = async () => {
    await userRecommend({ userId: store.userId }).then(res => {
        // console.log(res);
        guessItems.value = res.data
    })
}
onMounted(() => {
    popularRecommend().then(res => {

        hotItems.value = res.data
    })

    if (store.isLoggedIn) {
        getUserRecommend()
    }

})
const handleItemClick = (id: number) => {
    router.push({
        name: 'SpotDetail',
        query: { id }
    });
};
</script>

<style scoped>
.recommendation-module {
    border-left: 1px solid #ddd;
    padding:  0 10px;

}

.title {
    font-size: 16px;
    font-weight: bold;
    margin: 6px;
}

.carousel-item {
    overflow: hidden;
    text-align: center;
    margin-bottom: 10px;
}

.carousel-img {
    width: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    border-radius: 4px;
}

.carousel-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 10px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

:deep(.el-carousel__indicator--horizontal) {
    display: none;
}

.guess-you-like {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.guess-item {
    margin-bottom: 10px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: 1px solid #ddd;
    padding-bottom: 10px;
}

.guess-img-wrapper {
    overflow: hidden;
    position: relative;
}

.guess-img {
    width: 100%;
    height: 150px;
}

.guess-title {
    color: #333;
}
</style>