<template>
  <div class="chart ratio ratio-16x9">
    <WhydEchartWordCloud
      ref="wordCloud"
      :words="wordUsage"
      :size-min="wordSizeMin"
      :size-max="wordSizeMax"
      :grid-size="wordGridSize"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      wordUsage: [],
      wordSizeMin: 20,
      wordSizeMax: 100,
      wordGridSize: 8
    }
  },
  async fetch () {},
  async mounted () {},
  methods: {
    async init (id, urlPrefix) {
      const wordData = await fetch(
        `${urlPrefix}/user/${id}/mostUsedWordsNoStop.json`
      ).then(res => res.json())
      for (const key in wordData) {
        this.wordUsage.push({
          name: wordData[key][0],
          value: Math.sqrt(wordData[key][1])
        })
      }
      this.wordSizeMin = this.wordSizeMin * (window.innerWidth / 1920)
      this.wordSizeMax = this.wordSizeMax * (window.innerWidth / 1920)
      this.wordGridSize = this.wordGridSize * (window.innerWidth / 1920)
      this.$refs.wordCloud.init()
    }
  }
}
</script>

<style scoped>
.chart {
  background-color: black;
}
</style>
