<template>
  <div class="container d-flex flex-column w-50">
    <h4>you're {{ title }}</h4>
    <div class="timeOfDayChart ratio ratio-16x9 w-75 align-self-center">
      <WhydEchartHist
        :title="'Messages'"
        :color="'#fff'"
        :bgColor="'#C6CCFB'"
        :textColor="'#303030'"
        ref="hist"
      />
    </div>
  </div>
</template>

<script>
let titleMap = {
  morning: "crazy",
  afternoon: "productive in the afternoon",
  evening: "a night owl",
  overnight: "nocturnal (or Kian)",
};

export default {
  props: {},
  data() {
    return {
      title: "",
    };
  },
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      let data = await fetch(`${urlPrefix}/user/${id}/timeOfDay.json`).then(
        (res) => res.json()
      );
      this.title = titleMap[data.maxTime];
      let labels = ["Overnight", "Morning", "Afternoon", "Evening"];
      let timeCounts = [
        data.overnight,
        data.morning,
        data.afternoon,
        data.evening,
      ];

      this.$refs.hist.init(labels, timeCounts);
    },
  },
};
</script>

<style scoped>
.timeOfDayChart {
    width: 50%;
}
</style>