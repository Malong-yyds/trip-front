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
import { userRecommend, popularRecommend } from '/@/api'
import { useStore } from '/@/store/modules/user'
import './style/RecommendBar.css'

interface CommonItem {
    image_link: string,
    name: string
}
interface HotItem extends CommonItem {
    attraction_id: number;
}

interface GuessItem extends CommonItem {
    id: number;
}
const store = useStore();
const router = useRouter()
const hotItems = ref<HotItem[]>([])
const guessItems = ref<GuessItem[]>([])

const getUserRecommend = async () => {
    await userRecommend(store.userId as unknown as number).then(res => {
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
:deep(.el-carousel__indicator--horizontal) {
    display: none;
}
</style>