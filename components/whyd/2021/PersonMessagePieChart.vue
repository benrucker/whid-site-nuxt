<template>
  <Whyd2021EchartPie
    ref="pieChart"
    :title="'Messages'"
    :bg-color="'white'"
    :colors="[]"
  />
</template>

<script>
export default {
  data() {
    return {
      userPercentile: -1
    }
  },
  methods: {
    async init(id, urlPrefix) {
      const yearTotal = await fetch(`${urlPrefix}/msgPerYear.json`)
        .then((res) => res.json())
        .then((json) => json['1640908800000'])
      const userData = await fetch(
        `${urlPrefix}/user/${id}/msgCount.json`
      ).then((res) => res.json())
      const userTotal = userData.totalMessages
      this.userPercentile = userData.percentile
      const yearDiff = yearTotal - userTotal

      const colors = ['#f3df4c', '#4c60f3']

      this.$refs.pieChart.init(
        [
          { name: "Other's messages", value: yearDiff },
          { name: 'Your messages', value: userTotal }
        ],
        colors
      )
    }
  }
}
</script>
