<template>
  <WhydEchartPie
    ref="pieChart"
    :title="'Messages'"
    :bgColor="'white'"
    :colors="[]"
  />
</template>

<script>
export default {
  data() {
    return {
      userPercentile: -1,
    };
  },
  methods: {
    async init(id, urlPrefix) {
      let yearTotal = await fetch(`${urlPrefix}/msgPerYear.json`)
        .then((res) => res.json())
        .then((json) => json["1640908800000"]);
      let userData = await fetch(`${urlPrefix}/user/${id}/msgCount.json`)
        .then((res) => res.json());
      let userTotal = userData["totalMessages"];
      this.userPercentile = userData["percentile"];
      let yearDiff = yearTotal - userTotal;

      let colors = ['#f3df4c', '#4c60f3'];

      this.$refs.pieChart.init([
          { name: "Other's messages", value: yearDiff },
          { name: "Your messages", value: userTotal },
      ], colors);
    },
  },
};
</script>