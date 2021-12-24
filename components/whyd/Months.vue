<template>
  <div class="text-center">
    <h1>you seem to have been most active in {{ month }}</h1>
    <div class="ratio ratio-16x9">
      <WhydEchartLine
        :title="'Messages by Month'"
        :color="'#fff'"
        :bgColor="'#4c60f3'"
        ref="monthsChart"
      />
    </div>
    <h2 class="text-muted">you must not have had a lot else going on...</h2>

    <h2 class="">
      btw, in {{ month }}, the word you used the most was <b>{{ word }}</b
      >.<br />
      maybe that explains what was going on?
    </h2>
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