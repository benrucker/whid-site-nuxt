<template>
  <v-chart ref="chart" class="chart" :option="option" />
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
} from 'echarts/components'
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
    data: [],
    xAxis: [],
    title: '',
    bgColor: '',
    color: '',
    textColor: ''
  },
  data () {
    return {
      option: {},
      lines: [],
      labels: []
    }
  },
  mounted () {
    window.onresize = () => {
      this.$refs.chart.resize()
    }
  },
  methods: {
    init (xAxis, data) {
      this.option = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: xAxis,
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
            data,
            barWidth: '60%',
            roundCap: true,
            itemStyle: {
              borderRadius: [10, 10, 0, 0]
            },
            animationDelay (idx) {
              return idx * 100
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
