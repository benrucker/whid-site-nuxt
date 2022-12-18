<template>
  <Whyd2022ChatChartEchartBar
    v-if="msgCounts.length"
    :bg-color="'transparent'"
    :color="'#8677cb'"
    :text-color="'#fff'"
    :y-axis="msgCounts"
    :x-axis="years"
    class="msg-per-year"
  />
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      years: ['2016', '2017', '2018', '2019', '2020', '2021', '2022']
    }
  },
  computed: {
    msgCounts() {
      const msgCountsPastYears = Object.values(
        this.stats.server.messagesInPastYears
      )
      const msgCountsAllYears = msgCountsPastYears.concat(
        this.stats.server.totalMessages
      )
      return msgCountsAllYears
    }
  }
}
</script>

<style scoped>
.msg-per-year {
  width: calc(var(--convo-width) - 160px);
  height: 200px;
  padding: 0px;
  animation: fade-in 0.5s ease-in-out;
}
</style>
