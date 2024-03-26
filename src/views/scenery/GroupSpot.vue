<template>
    <div class="class-activity-container">
        <h1 class="activity-title">{{groupName}}</h1>
        <div class="card-grid">
            <el-card v-for="(item, index) in spotData" :key="item.id" class="spot-card"
                :style="{ marginTop: index % 3 !== 1 ? `${titleHeight}px` : '0' }">
                <img class="spot-image" :src="item.image_link.split(';')[0]" alt="alt" />
                <div class="card-footer">
                    <a @click="handleSpotClick(item.id)">
                        <b>{{ item.name }}</b>
                    </a>
                    <span v-if="item.average_score"><b>{{ item.average_score }}</b></span>

                </div>
                <p v-if="item.description">介绍：{{ item.description }}</p>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { groupRemmend } from '/@/api';

interface spotItem {
    id: number,
    image_link: string,
    name: string,
    average_score: number,
    description: string
}
const titleHeight = 50;
const route = useRoute()
const router = useRouter()
const groupName=ref(route.query.name)
const attId = ref<number>(Number(route.query.id))
const spotData = ref<spotItem[]>([])
const getData = async () => {
    await groupRemmend(attId.value).then(res => {
        spotData.value = res.data
    }).catch(e => {
        console.log(e);

    })
}

onMounted(() => {
    getData()
})

watch(() => route.query, (newVal) => {
    attId.value = newVal.id
    groupName.value=newVal.name
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
.class-activity-container {
    margin: 20px 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.activity-title {
    margin-bottom: 10px;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* grid-gap: 30px; */
}

.spot-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.card-footer a {
    flex-grow: 1;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-footer span {
    color: #f8961e;
    margin-left: 10px;
}

.spot-card p {
    flex-shrink: 0;
    margin-top: 10px;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #909399bf;

}
</style>