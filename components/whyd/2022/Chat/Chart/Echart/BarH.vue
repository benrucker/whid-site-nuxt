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
    this.$refs.chart.resize()
    this.option = {
      grid: {
        left: '3%',
        right: '4%',
        bottom: '0%',
        top: '0%',
        containLabel: true
      },
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'shadow'
        },
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
      },
      yAxis: [
        {
          type: 'category',
          data: [...this.yAxis].reverse(),
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            inside: true,
            verticalAlign: 'top'
          }
        }
      ],
      xAxis: [
        {
          type: 'value',
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: this.title,
          type: 'bar',
          data: [...this.xAxis].reverse(),
          barWidth: '80%',
          roundCap: true,
          itemStyle: {
            borderRadius: [0, 5, 5, 0]
          },
          z: -1,
          animationDelay: (idx) => {
            return (this.xAxis.length - idx) * 250
          },
          animationDuration() {
            return 1000
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
  }
}
</script>

<style scoped>
.chart {
  min-height: 10px;
  z-index: 0;
}
</style>
