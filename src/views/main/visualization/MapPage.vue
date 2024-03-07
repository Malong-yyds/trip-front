<template>
  <div>
    <div id="map-container" style="width: 100%; height: 80vh;">
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { useRouter } from 'vue-router';  
import guangdong from './guangdong.json';
import attractions from './attractions.json';
const router = useRouter();  
const attractionsData = ref(attractions);
const city_data = [
{id:'gz' ,name: '广州市', value: 17 },{ id:'sz' ,name: '深圳市', value: 4 },
          { id:'zh' ,name: '珠海市', value: 4 },{ id:'fs' ,name: '佛山市', value: 4 },
          {id:'zs' , name: '中山市', value: 4 },{ id:'hz' ,name: '惠州市', value: 6 },
          { id:'dg' ,name: '东莞市', value: 4 },
          {id:'jm' , name: '江门市', value: 4 },{id:'yf' , name: '云浮市', value: 4 },
          { id:'zq' ,name: '肇庆市', value: 4 },{id:'mm' , name: '茂名市', value: 2 },
          { id:'zj' ,name: '湛江市', value: 2},{ id:'yj' ,name: '阳江市', value: 3 },
          {id:'qy' , name: '清远市', value: 3 },{id:'sg' , name: '韶关市', value: 8 },
          { id:'hy' ,name: '河源市', value: 2},{ id:'sw' ,name: '汕尾市', value: 6 },
          {id:'jy' , name: '揭阳市', value: 4 },
          { id:'mz' ,name: '梅州市', value: 8 },{id:'st' , name: '汕头市', value: 4 },
          {id:'cz' , name: '潮州市', value: 4 }]
onMounted(async () => {
  const myChart = echarts.init(document.getElementById('map-container'));
  echarts.registerMap('guangdong', guangdong);
  const option = buildOption(attractionsData.value);
  myChart.setOption(option);

  myChart.on('click', function(params) {
    // console.log(params.data.id);
    const cityId=params.data.id
    router.push({'name':'SceneryPage',query:{cityId}})
    console.log('key',cityId);
    
});

});
// 构建ECharts选项  
function buildOption(attractions: any[]) {
  const markPointData = [];
  for (const attraction of attractions) {
    markPointData.push({
      name: attraction.name,
      coord: [attraction.lng, attraction.lat],
    });
  }
  return {
    visualMap: {
      min:0,
      max:20,
      left: 'left',
      top: 'bottom',
      text: ['High', 'Low'],
      calculable: true
    },

    tooltip: {

      // triggerOn:'click',
      extraCssText: 'width: 250px; height: auto;white-space: normal;',
      position: [15,10],
      hideDelay : 10000,
      backgroundColor:'#7f646412',
      borderColor:'#7f646412',
      formatter: function (params: any) {

        const attraction = attractionsData.value.find(item => item.name === params.name);
        if (attraction) {
          return `<b>${params.name}</b><br/>介绍：${attraction.introduction}`;
        }
        return '';
      }
    },
    series: [{
      type: 'map',
      map: 'guangdong',
      roam: true, // 允许缩放  
      draggable: false, // 禁止平移  
      label: {
        show: true
      },
      data: city_data,
      markPoint: {
        symbol: 'circle',
        symbolSize: 10,
        label: {
          show: true,
          formatter: '{b}',
          color: '#fff',
          fontSize: 14,

        },
        data: markPointData,

      },

    }]
  };
}  
</script>

<style scoped>
#map-container {
  width: 100%;
  height: 80vh;
  white-space: pre-line;
}
</style>