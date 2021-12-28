<template>
  <div class="container d-flex flex-column w-50 pt-5">
    <h4>you're {{ title }}</h4>
    <p>better check your horoscope</p>
    <div class="astroChart ratio ratio-4x3 w-75 align-self-center">
      <WhydEchartBarPolar
        :title="'Messages'"
        :color="'#fff'"
        :bgColor="'#C6CCFB'"
        :textColor="'#303030'"
        ref="astroChart"
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
      preposition: "",
      timeRange: "",
    };
  },
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      let data = await fetch(`${urlPrefix}/user/${id}/sign.json`).then(
        (res) => res.json()
      );
      this.title = `${/^[AEIOU]/.test(data.maxSign) ? "an" : "a"} ${data.maxSign}`;
      delete data.maxSign;

      let signs = Object.keys(data);
      let counts = Object.values(data);

      this.$refs.astroChart.init(signs, counts);
    },
  },
};
</script>

<style scoped>
</style>