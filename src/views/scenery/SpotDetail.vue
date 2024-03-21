<template>
    <div class="spot-page" ref="containerRef">

        <div class="upper-section section" id="part1">

            <div class="video-overlay" @mousedown="startDrag" @mousemove="drag" @mouseup="endDrag" @mouseleave="endDrag"
                ref="draggableDiv" v-if="spot.video">

                <video class="draggable-video" controls :src="baseUrl + spot.video" alt="景点视频"></video>
            </div>
            <div class="carousel">
                <el-carousel>
                    <el-carousel-item v-for="(item, index) in spot.image_link.split(';')" :key="index"
                        class="carousel-item">
                        <el-image :src="item" alt="景点图片" class="carousel-image"></el-image>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="spot-info">
                <h2><a target="_blank" :href="getMapUrl(spot.name!)">{{ spot.name }}</a></h2>
                <p v-if="spot.average_score"><b>评分:</b> {{ spot.average_score }}分</p>
                <p><b>地址:</b> {{ spot.address }}</p>
                <p><b>开放时间:</b> {{ spot.opening_hours ? spot.opening_hours : '具体以现场为准' }}</p>
                <p><b>官方电话: </b>{{ spot.official_phone ? spot.official_phone : '暂无' }}</p>

            </div>
        </div>


        <div class="lower-section">
            <div class="section" id="part2">
                <h3>景点介绍</h3>
                <p>{{ spot.description }}</p>
            </div>
            <div class="section" id="part8" v-if="spot.transport">
                <h3>交通指南</h3>
                <p>{{ spot.transport }}</p>
            </div>
            <div class="section" v-if="spot.tips" id="part3">
                <h3>必看贴士</h3>
                <p>{{ spot.tips }}</p>
            </div>
            <div class="section" id="part4">
                <div class="comments-button">
                    <h3>用户评价</h3>
                    <el-button @click="showDrawer" :icon="Edit">发表评论</el-button>
                </div>
                <UserReview :msg="attId"></UserReview>
            </div>
            <el-drawer v-model="drawer" direction="btt" size="46%">
                <PostReview :msg="attId"></PostReview>
            </el-drawer>
            <div class="section" id="part7">
                <h3>周边景点</h3>
                <p>{{ spot.description }}</p>
            </div>
            <div class="section" id="part5">
                <h3>附近美食</h3>
               
                    <SurroundingCuisine></SurroundingCuisine>
              
            </div>
            <!-- <div class="section" id="part6">
                <h3>民宿酒店</h3>
               
                <div class="stay">
                    <el-card style="max-width: 200px" v-for="item in 4">

                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                            style="width: 100%" />
                        <template #footer>
                            <span>user</span>
                            <p>这个非常好吃
                            </p>
                        </template>
                    </el-card>
                </div>
            </div> -->
          
        </div>
        <el-backtop :visibility-height=0 :bottom="100" style="left: 250px">
            <el-anchor>
                <el-anchor-link href="#part1">
                    <el-icon :size="20">
                        <ArrowUpBold />
                    </el-icon>
                </el-anchor-link>
                <el-anchor-link href="#part2" title="介绍" />
                <el-anchor-link href="#part8" title="交通" />
                <el-anchor-link href="#part3" title="贴士" />
                <el-anchor-link href="#part4" title="评论" />
               
                <!-- <el-anchor-link href="#part6" title="住宿" /> -->
                <el-anchor-link href="#part7" title="周边" />
                <el-anchor-link href="#part5" title="美食" />
            </el-anchor>
        </el-backtop>
    </div>

</template>

<script setup lang="ts">
import PostReview from "./components/PostReview.vue";
import UserReview from "./components/UserReview.vue";
import SurroundingCuisine from "./components/SurroundingCuisine.vue";
import { attractionDetail } from '/@/api';
import { Edit, Picture as IconPicture,  ArrowUpBold } from '@element-plus/icons-vue'

import { useStore } from '/@/store/modules/user';
import './SpotDetail.css';
import { baseUrl } from '/@/service'
// 拖动参数
const draggableDiv = ref<HTMLElement | null>(null);
let dragging = false;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;
let offsetX = 0;
let offsetY = 0;

// 开始拖拽的函数  
const startDrag = (event: MouseEvent) => {
    // 设置dragging为true，表示拖拽操作开始  
    dragging = true;
    // 计算鼠标的初始X坐标与offsetX的差值，保存到initialX  
    initialX = event.clientX - offsetX;
    initialY = event.clientY - offsetY;
};

// 拖拽中的函数  
const drag = (event: MouseEvent) => {
    if (dragging) {
        // 阻止事件的默认行为  
        event.preventDefault();
        // 计算鼠标的当前X坐标与initialX的差值，得到新的X坐标偏移量  
        const newX = event.clientX - initialX;
        const newY = event.clientY - initialY;
        // 更新offsetX的值  
        offsetX = newX;
        offsetY = newY;
        // 调用setTranslate函数，根据新的X和Y偏移量来移动元素  
        setTranslate(newX, newY);
    }
};

// 结束拖拽的函数  
const endDrag = () => {
    // 设置dragging为false，表示拖拽操作结束  
    dragging = false;
};

// 设置元素平移的函数  
const setTranslate = (xPos: number, yPos: number) => {
    // 如果draggableDiv有值（即存在对应的DOM元素）  
    if (draggableDiv.value) {
        // 使用CSS的transform属性，设置元素的平移效果  
        draggableDiv.value.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
};

const router = useRouter()
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
    transport:null,
    video: null,
    image_link: '',
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
    // 确保在组件挂载后绑定事件  
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('mouseleave', endDrag);
})
// 在组件卸载时移除事件监听器，避免内存泄漏  
onUnmounted(() => {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('mouseleave', endDrag);
});
// 监听路由参数的变化，并在变化时更新 attId  
watch(() => route.query.id, (newVal) => {
    attId.value = Number(newVal);
    getData()

});

// 高德地图导航
const getMapUrl = (name: string) => {
    return `https://ditu.amap.com/search?query=${encodeURIComponent(name)}`;
}


</script>

<style scoped>
.el-anchor {
    --el-anchor-active-color: #f8961e;
    --el-anchor-marker-bg-color: none;
}
</style>
