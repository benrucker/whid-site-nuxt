<template>
  <v-chart ref="chart" class="chart" :option="option" />
</template>

<script>
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent
} from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
])

export default {
  name: 'HelloWorld',
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: 'dark'
  },
  props: {
    yAxis: {
      type: Array,
      required: true
    },
    xAxis: {
      type: Array,
      required: true
    },
    title: { type: String, default: '' },
    bgColor: { type: String, default: '' },
    color: { type: String, default: '' },
    textColor: { type: String, default: '' }
  },
  data() {
    return {
      option: {},
      lines: [],
      labels: []
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.$refs.chart.resize()
    })
    setTimeout(() => {
      this.$refs.chart.resize()
      this.option = {
        grid: {
          left: '6%',
          right: '4%',
          bottom: '3%',
          top: '4%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxis,
            axisTick: {
              // alignWithLabel: true,
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: this.title,
            type: 'bar',
            data: this.yAxis,
            barWidth: '70%',
            roundCap: true,
            itemStyle: {
              borderRadius: [5, 5, 0, 0]
            },
            animationDelay(idx) {
              return idx * 150
            },
            animationDuration() {
              return 400
            }
          }
        ],
        color: [this.color],
        backgroundColor: this.bgColor,
        textStyle: {
          color: this.textColor,
          fontSize: 36,
          fontWeight: 'bold'
        }
      }
    }, 500)
  }
}
</script>

<style scoped>
.chart {
  min-height: 10px;
}
</style>

<style>
body {
  margin: 0;
}
</style>
