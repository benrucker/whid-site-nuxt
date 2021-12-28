<template>
  <v-chart class="chart" :option="option" ref="chart" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
]);

export default {
  name: "HelloWorld",
  props: {
    data: [],
    xAxis: [],
    title: "",
    bgColor: "",
    color: "",
    textColor: "",
    right: false,
    showTitle: false,
    formatter: false,
    xAxisLabel: '',
  },
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "dark",
  },
  mounted() {
    window.onresize = () => {
      this.$refs.chart.resize();
    };
  },
  data() {
    return {
      option: {},
      lines: [],
      labels: [],
    };
  },
  methods: {
    init(xAxis, data, colorsIn) {
      this.option = {
        title: {
          text: this.title,
          textStyle: {
            color: this.textColor,
            fontWeight: "normal",
          },
          show: this.showTitle,
          left: 'center',
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: this.formatter ? this.formatter : (params) => `${params[0].name} ${this.title}: ${params[0].value.toLocaleString()}`,
        },
        xAxis: [
          {
            type: "category",
            data: xAxis,
            splitLine: {
              show: false,
              lineStyle: {
                color: "#fff",
              },
            },
            axisLabel: {
              align: this.right ? 'left': 'center',
            },
            axisLine: {
              lineStyle: {
                color: this.textColor,
              },
            },
            axisTick: {
              lineStyle: {
                color: this.textColor,
              },
            },
            boundaryGap: ['20%', '20%'],
            name: this.xAxisLabel,
            nameLocation: 'middle',
            nameTextStyle: {
              color: this.textColor,
              fontWeight: "normal",
              fontSize: 12,
            }
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: data,
            barWidth: "99.3%",
            itemStyle: {
              opacity: 0.5,
            },
            axisLabel: {
              interval: 0,
              rotate: 0,
            },
            colorBy: 'data',
          },
        ],
        color: this.color,
        backgroundColor: this.bgColor,
        textStyle: {
          color: this.textColor,
          fontSize: 36,
          fontWeight: "bold",
        },
      };
    },
  },
};
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