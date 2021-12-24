<template>
  <WhydEchartBar
    ref="yearBarChart"
    :title="'Messages'"
    :bgColor="'#f3df4c'"
    :color="'#4c60f3'"
    :textColor="'#000'"
  />
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    async init(urlPrefix) {
      let yearCounts = await fetch(`${urlPrefix}/msgPerYear.json`).then((res) =>
        res.json()
      );
      let years = ['2016', '2017', '2018', '2019', '2020', '2021'];
      let msgCounts = Object.values(yearCounts);
      this.$refs.yearBarChart.init(years, msgCounts);
    },
  },
};
</script>