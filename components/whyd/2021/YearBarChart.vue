<template>
  <Whyd2021EchartBar
    ref="yearBarChart"
    :title="'Messages'"
    :bg-color="'#f3df4c'"
    :color="'#4c60f3'"
    :text-color="'#303030'"
  />
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    async init(urlPrefix) {
      const yearCounts = await fetch(`${urlPrefix}/msgPerYear.json`).then(
        (res) => res.json()
      )
      const years = ['2016', '2017', '2018', '2019', '2020', '2021']
      const msgCounts = Object.values(yearCounts)
      this.$refs.yearBarChart.init(years, msgCounts)
    }
  }
}
</script>
