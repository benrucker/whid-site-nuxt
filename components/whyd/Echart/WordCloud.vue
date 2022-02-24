<template>
  <VChart ref="chart" class="chart" :option="option" />
</template>

<script>
// import * as echarts from "echarts";
import VChart, { THEME_KEY } from 'vue-echarts'

if (process.browser) {
  require('echarts-wordcloud')
}

export default {
  name: 'HelloWorld',
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: 'dark'
  },
  props: {
    words: [],
    sizeMin: 0,
    sizeMax: 0,
    gridSize: 0
  },
  data () {
    return {
      option: {},
      lines: [],
      labels: []
    }
  },
  mounted () {},
  mounted () {
    window.onresize = () => {
      this.$refs.chart.resize()
    }
  },
  methods: {
    init () {
      const maskImage = new Image()
      maskImage.src = '/whyd/2021/2021.png'
      maskImage.onload = () => {
        this.option = {
          title: {},
          legend: {},
          grid: {},
          backgroundColor: '#000',
          series: [
            {
              type: 'wordCloud',
              shape: 'pentagon',
              maskImage,
              left: 'center',
              top: 'center',
              width: '100%',
              height: '100%',
              right: null,
              bottom: null,
              sizeRange: [this.sizeMin, this.sizeMax],
              rotationRange: [-20, 20],
              rotationStep: 5,
              gridSize: this.gridSize,
              drawOutOfBound: false,
              layoutAnimation: true,
              textStyle: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                color: 'white'
              },
              emphasis: {
                focus: 'self',

                textStyle: {
                  textShadowBlur: 10,
                  textShadowColor: '#333'
                }
              },

              data: this.words
            }
          ]
        }
      }
    }
  }
}
</script>

<style scoped>
.chart {
}
</style>

<style>
body {
  margin: 0;
}
</style>
