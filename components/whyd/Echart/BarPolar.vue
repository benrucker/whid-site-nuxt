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
  GridComponent,
  PolarComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  PolarComponent
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
        polar: {
          radius: [30, '80%']
        },
        angleAxis: {
          startAngle: 75
        },
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
        radiusAxis: {
          type: 'category',
          data: xAxis,
          show: false
        },
        series: [
          {
            name: this.title,
            type: 'bar',
            data,
            coordinateSystem: 'polar',
            roundCap: false,
            itemStyle: {
              borderRadius: [10, 10, 0, 0]
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
