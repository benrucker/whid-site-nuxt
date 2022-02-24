<template>
  <v-chart ref="chart" class="chart" :option="option" />
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  VisualMapComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  VisualMapComponent
])

export default {
  name: 'HelloWorld',
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: 'light'
  },
  props: {
    title: '',
    bgColor: '',
    colors: []
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
    init (data, colors) {
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: params =>
            params.name +
            ': ' +
            params.value.toLocaleString() +
            ' (' +
            params.percent +
            '%)'
        },
        visualMap: {
          type: 'continuous',
          show: false,
          min: 1,
          max: 1000,
          inRange: {
            colorHue: 53,
            colorSaturation: 0.87, // (53, 87%, 63%)
            colorLightness: [0.88, 0.63] // (53, 87%, 88%)
          }
        },
        series: [
          {
            clockwise: false,
            name: this.title,
            type: 'pie',
            data,
            stillShowZeroSum: false,
            radius: ['20%', '50%'],
            center: ['50%', '50%'],
            colorBy: 'data',
            color: colors,
            labelLine: {
              lineStyle: {
                color: 'rgba(0, 0, 0, 0.3)'
              },
              smooth: 0.2,
              length: 50
              // length2: 20,
            },
            label: {
              show: true
            },
            emphasis: {
              label: {
                fontWeight: 'bold',
                fontSize: '16'
              }
            },
            itemStyle: {
              shadowBlur: 50,
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: 5,
              borderColor: this.bgColor
              // borderWidth: 2,
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay (idx) {
              return Math.random() * 100 * idx
            }
          }
        ],
        color: colors,
        backgroundColor: this.bgColor,
        textStyle: {
          color: 'black',
          fontSize: 12,
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
