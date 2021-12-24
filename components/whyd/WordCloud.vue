<template>
  <div class="chart ratio ratio-16x9">
    <WhydEchartWordCloud
      :words="wordUsage"
      :sizeMin="wordSizeMin"
      :sizeMax="wordSizeMax"
      :gridSize="wordGridSize"
      ref="wordCloud"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      wordUsage: [],
      wordSizeMin: 20,
      wordSizeMax: 100,
      wordGridSize: 8,
    };
  },
  async fetch() {},
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      let wordData = await fetch(
        `${urlPrefix}/user/${id}/mostUsedWordsNoStop.json`
      ).then((res) => res.json());
      for (let key in wordData) {
        this.wordUsage.push({
          name: wordData[key][0],
          value: Math.sqrt(wordData[key][1]),
        });
      }
      this.wordSizeMin = this.wordSizeMin * (window.innerWidth / 1920);
      this.wordSizeMax = this.wordSizeMax * (window.innerWidth / 1920);
      this.wordGridSize = this.wordGridSize * (window.innerWidth / 1920);
      this.$refs.wordCloud.init();
    },
  },
};
</script>

<style scoped>
.chart {
  background-color: black;
}
</style>