<template>
    <div>
        <el-card v-for="(spot, index) in spots" :key="index" class="spot-card">
            <el-row>
                <el-col :span="5">
                    <img class="scenic-spot-image" :src="spot.image_link.split(';')[0]" alt="景点图片" />
                </el-col>
                <el-col :span="9" class="left-aligned">
                    <h1>
                        <el-icon>
                            <HomeFilled />
                        </el-icon> <a @click="handleSpotClick(spot.attraction_id)">{{ spot.name }}</a>
                    </h1>
                    <p> <el-icon>
                            <Location />
                        </el-icon> {{ spot.address }}</p>
                </el-col>
                <el-col :span="7" class="right-aligned">
                    <p><el-rate v-model="spot.average_score" disabled show-score text-color="#ff9900"
                            score-template="{value} 分" allow-half /></p>
                    <p>{{ spot.review_count }} 条评论</p>
                </el-col>
            </el-row>
        </el-card>

        <el-pagination @current-change="handlePageChange" :current-page="currentPage" :page-size="pageSize"
            layout="prev, pager, next, jumper" :total="totalSpots" hide-on-single-page></el-pagination>
    </div>
</template>

<script setup lang="ts">
import './style/index.css'
import { attractionSearch } from "/@/api/index";
import { useStore } from '/@/store/modules/user';
import { HomeFilled, Location } from "@element-plus/icons-vue";

interface soptItem {
    name:string,
    image_link:string,
    attraction_id:number,
    address:string,
    average_score:number,
    review_count:number,
}
const router = useRouter();
const store = useStore();
const route = useRoute()
const flag = ref()

const spots = ref<soptItem[]>([])
const totalSpots = ref(0);
const pageSize = ref(5);
const currentPage = ref(1);
const getLsit = () => {
    attractionSearch(flag.value, currentPage.value, pageSize.value).then(res => {
        spots.value = res.data.attractions_list
        totalSpots.value = res.data.total_count
        if (totalSpots.value == 0) {
            ElMessage({
                type: 'info',
                message: '暂无结果，请换个关键词',
                duration: 1000
            })
        }
    }).catch(e => {
        console.log(e);
    })
}

onMounted(() => {
    getLsit()

})

watchEffect(() => {
    const activeQuery = route.query.index || route.query.keyword || route.query.cityId
    flag.value = activeQuery
    if (activeQuery) {
        getLsit()
    }
});


const handlePageChange = (newPage: number) => {
    currentPage.value = newPage;
    getLsit();
};

const handleSpotClick = (id: number) => {
    router.push({
        name: 'SpotDetail',
        query: { id }
    });

};
</script>

<style scoped>

</style>