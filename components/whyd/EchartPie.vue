<template>
  <v-chart class="chart" :option="option" ref="chart" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  VisualMapComponent,
]);

export default {
  name: "HelloWorld",
  props: {
    title: "",
    bgColor: "",
    colors: [],
  },
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
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
    init(data, colors) {
      this.option = {
        tooltip: {
          trigger: "item",
          formatter: params => params.value.toLocaleString() + " (" + params.percent + "%)",
        },
        series: [
          {
            name: this.title,
            type: "pie",
            data: data,
            radius: "55%",
            center: ["50%", "50%"],
            colorBy: "data",
            // roseType: "radius",
            color: colors,
            labelLine: {
              lineStyle: {
                color: "rgba(0, 0, 0, 0.3)",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              shadowBlur: 50,
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200 * idx;
            },
          },
        ],
        color: colors,
        backgroundColor: this.bgColor,
        textStyle: {
          color: "black",
          fontSize: 24,
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