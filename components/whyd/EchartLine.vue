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
    init(xAxis, data) {
      this.option = {
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
          formatter: '{b}: {c}'
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
            name: this.title,
            type: "line",
            data: data,
            smooth: true,
            lineStyle: {
              width: 4,
            },
            itemStyle: {
              borderWidth: 5,
              borderColor: this.color,
            },
          },
          {
            type: "bar",
            data: data,
            barWidth: "99.3%",
            itemStyle: {
              color: this.color,
              opacity: 0.5,
            },
            tooltip: {
              show: false,
            }
          },
        ],
        color: [this.color],
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