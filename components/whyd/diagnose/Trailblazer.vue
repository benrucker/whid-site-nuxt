<template>
  <div v-if="exists" class="container d-flex flex-column w-50 pt-5">
    <h4>you're a trailblazer</h4>
    <p>you sent {{ count.toLocaleString() }} messages after 5 hours of inactivity in a channel</p>
    <div class="timeOfDayChart ratio ratio-16x9 w-100 align-self-center">
      <WhydEchartHist
        :title="'Number of people who sent messages after\n5 hours of channel inactivity'"
        :color="'#ffffff'"
        :bgColor="'#C6CCFB'"
        :textColor="'#303030'"
        :right="false"
        :showTitle="false"
        :formatter="(params) => `${params[0].value} ${params[0].value == 1 ? 'person' : 'people'} sent ${params[0].name} trailblazing messages`"
        :xAxisLabel="''"
        ref="hist"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      title: "",
      exists: false,
      count: 0,
    };
  },
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      let data = await fetch(`${urlPrefix}/user/${id}/trailblazing.json`)
        .then((res) => {
          this.exists = true;
          return res.json();
        })
        .catch(() => {
          this.exists = false;
          return {};
        });
      this.count = data['count'];
      let rank = data['rank'];

      let serverData = await fetch(`${urlPrefix}/trailblazeTimes.json`).then(
        (res) => res.json()
      );

      let labels = Object.keys(serverData).map(key => {
        let high = key.split(', ')[1].split('.')[0];
        let low = key.split(', ')[0].split('.')[0].split('(')[1];
        low = low.startsWith('-') ? 0 : low;
        return `${low}-${high}`;
      });
      let counts = Object.values(serverData);

      this.$refs.hist.init(labels, counts);
    },
  },
};
</script>

<style scoped>
.timeOfDayChart {
  width: 50%;
}
</style>