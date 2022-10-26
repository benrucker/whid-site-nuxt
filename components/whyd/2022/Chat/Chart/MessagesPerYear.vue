<template>
  <Whyd2022ChatChartEchartBar
    :bg-color="'transparent'"
    :color="'#4c60f3'"
    :text-color="'#303030'"
    :y-axis="msgCounts"
    :x-axis="years"
    class="msg-per-year"
  />
</template>

<script>
export default {
  data() {
    return {
      years: [],
      msgCounts: []
    }
  },
  async fetch() {
    const yearCounts = await fetch('2021/data/msgPerYear.json').then((res) =>
      res.json()
    )
    this.years = ['2016', '2017', '2018', '2019', '2020', '2021']
    this.msgCounts = Object.values(yearCounts)
  }
}
</script>

<style scoped>
.msg-per-year {
  width: calc(var(--convo-width) - 160px);
  height: 200px;
  padding: 0px;
}
</style>
