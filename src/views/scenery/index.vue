<template>
    <div>
        <el-card v-for="(spot, index) in paginatedSpots" :key="index" class="spot-card">
            <el-row>
                <el-col :span="5">
                    <img class="scenic-spot-image" :src="spot.image_link" alt="景点图片" />
                </el-col>
                <el-col :span="9" class="left-aligned">
                    <h1>
                        <el-icon>
                            <HomeFilled />
                        </el-icon> <a @click="handleSpotClick(spot.attraction_id)">{{ spot.name }}</a></h1>
                    <p> <el-icon>
                            <Location />
                        </el-icon> {{ spot.address }}</p>
                </el-col>
                <el-col :span="7" class="right-aligned">
                    <p><el-rate v-model="spot.average_score" disabled show-score text-color="#ff9900"
                            score-template="{value} 分" allow-half/></p>
                    <p>{{ spot.review_count }} 条评论</p>
                </el-col>
            </el-row>
        </el-card>

        <el-pagination @size-change="handlePageSizeChange" @current-change="handlePageChange" :current-page="currentPage"
            :page-size="pageSize" layout="prev, pager, next, jumper" :total="totalSpots"  hide-on-single-page></el-pagination>
    </div>
</template>
    
<script setup lang="ts">

import { attractionSearch } from "/@/api/index";
import { useStore } from '/@/store/modules/user';
import { HomeFilled, Location} from "@element-plus/icons-vue";
const router = useRouter();
const store = useStore();  
const route = useRoute()
const flag = ref('')
console.log(route.query);

const spots = ref([])
const totalSpots = ref(0);
const spot = reactive({
    attraction_id: null,
    name: null,
    detail_page_link: null,
    image_link: null,
    address: null,
    average_score: null,
    review_count: null
})
const getLsit=()=>{
    attractionSearch({ q: flag.value }).then(res => {
        spots.value = res.data
        totalSpots.value = res.data.length
    }).catch(e => {
        console.log(e);
    })
}

onMounted(() => {
    getLsit()
    
})

watchEffect(() => {  
    const activeQuery = route.query.index || route.query.keyword || route.query.cityId;  
    flag.value = activeQuery;  
    if (activeQuery) {  
        getLsit();  
    }  
});  

const pageSize = ref(5); 
const currentPage = ref(1);
const paginatedSpots = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return spots.value.slice(start, end);
});

const handlePageSizeChange = (newPageSize:number) => {
    pageSize.value = newPageSize;
};

const handlePageChange = (newPage:number) => {
    currentPage.value = newPage;
};

const handleSpotClick = (id:number) => {
        router.push({
            name: 'SpotDetail',
            query: { id } 
        });
  
};
</script>  
    
<style scoped>
.spot-card {
    margin: 15px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
}

.scenic-spot-image {
    width: 100%;
    /* height: 100%; */
    /* border-radius: 8px 0 0 8px; */

}

.left-aligned {
    display: flex;
    text-align: left;
    flex-direction: column;
    padding-left: 10%;
}

.left-aligned h1 {
    font-size: 20px;
    font-weight: bold;
}

a:hover {  
    text-decoration: underline;  
}
.right-aligned {
    display: flex;
    flex-direction: column;
    text-align: right;
    font-size: 16px;
    font-weight: bold;
    padding: 20px;

}
</style>