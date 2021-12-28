<template>
  <div class="text-center">
    <div class="container">
      <h1>you seem to have been most active in <b>{{ month }}</b></h1>
      <div class="ratio ratio-16x9">
        <WhydEchartLineAndHist
          :title="'Messages by Month'"
          :color="'#fff'"
          :bgColor="'#4c60f3'"
          ref="monthsChart"
        />
      </div>
      <h4 class="text-dark py-5"><i>you must not have had a lot else going on...</i></h4>
    </div>
    <img src="/whyd/2021/lightblue-angle.svg" />
    <div class="bg lightblue">
      <h3 class="p-0 m-0">
        btw, in {{ month }}, the word you used the most was <b>{{ word }}</b
        >.<br />
        maybe that explains what was going on?
      </h3>
    </div>
    <img src="/whyd/2021/lightblue-angle2.svg" :class="'bg ' + nextBg" />
  </div>
</template>

<script>
export default {
  props: {
    urlPrefix: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    nextBg: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      monthCounts: [],
      word: "",
      month: "",
    };
  },
  async mounted() {},
  methods: {
    async init() {
      let data = await fetch(
        `${this.urlPrefix}/user/${this.id}/monthCounts.json`
      ).then((res) => res.json());
      this.monthCounts = Object.values(data);
      let favData = await fetch(
        `${this.urlPrefix}/user/${this.id}/favMonth.json`
      ).then((res) => res.json());
      this.month = favData["maxMonth"];
      this.word = favData["word"];

      this.$refs.monthsChart.init(this.months, this.monthCounts);
    },
  },
};
</script>

<style scoped>
img {
  z-index: -1;
}
</style>