<template>
  <div>
    <div id="map-container" style="width: 100%; height: 800px;"></div>
    <!-- <div id="scenic-spots" style="margin-top: 20px;"> -->
      <!-- 景点信息将会动态添加到这里 -->
    <!-- </div> -->
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import guangdong from './guangdong.json';
import { reduce } from 'lodash';
onMounted(() => {


  // 初始化echarts实例  
  const myChart = echarts.init(document.getElementById('map-container'));
  echarts.registerMap('guangdong', guangdong);
  // 指定图表的配置项和数据  
  const option = {
    // 地图配置  
    visualMap: {
      min: 800,
      max: 50000,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      }
    },

    series: [{
      type: 'map',
      map: 'guangdong', // 使用广东省地图  
      raom:'scale', 
      label: {
        show: true,
        // silent: true ,
      },


      data: [
        { name: '广州市', value: 20057.34 },
        { name: '深圳市', value: 15477.48 },
        { name: '珠海市', value: 31686.1 },
        { name: '佛山市', value: 6992.6 },
        { name: '中山市', value: 44045.49 },
        { name: '惠州市', value: 40689.64 },
        { name: '东莞市', value: 37659.78 },
        { name: '江门市', value: 45180.97 },
        { name: '云浮市', value: 55204.26 },
        { name: '肇庆市', value: 21900.9 },
        { name: '茂名市', value: 4918.26 },
        { name: '湛江市', value: 5881.84 },
        { name: '阳江市', value: 4178.01 },
        { name: '清远市', value: 2227.92 },
        { name: '韶关市', value: 2180.98 },
        { name: '河源市', value: 9172.94 },
        { name: '汕尾市', value: 3368 },
        { name: '揭阳市', value: 806.98 },
        { name: '梅州市', value: 9172.94 },
        { name: '汕头市', value: 3368 },
        { name: '潮州市', value: 806.98 }
      ],

      markLine: {

      },


      markPoint: {
        symbol: 'circle',
        symbolSize: 10,
        data: [{
          name: '长隆欢乐世界1',
          coord: [113.324, 23.108],
          label: {
            show: true,
            position: "bottom",
            formatter: '长隆欢乐世界'
          },

          emphasis: {
            label: {
              show: true,
              position: 'top',
              formatter: '长隆欢乐世界a的更多详情...'
            }

          },

        }, {
          name: '茂德公',
          coord: [110.29, 21.13],
          label: {
            show: true,
            position: "bottom",
            formatter: '茂德公'
          },
          emphasis: {
            label: {
              show: true,
              position: 'top',
              formatter: '更多详情...',

              rich: {
                a: {
                  color: 'green',
                  lineHeight: 22,
                  align: 'center'
                }

              }
            },
          }
        }]
      }
    },
    ],

    // 其他全局配置项...  
  };

  // 使用刚指定的配置项和数据显示图表。  
  myChart.setOption(option);


})
</script>



<style scoped>
#map-container {
  width: 100%;
  height: 600px;
}

#scenic-spots {
  /* 景点信息容器样式 */
}
</style>