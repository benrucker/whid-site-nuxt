<template>
  <Whyd2022ChatChartMusic
    :header="`${intermediateSongCount} songs played`"
    bg-img="/whyd/2022/music/currents.png"
  />
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    numberUpper: 0,
    intermediateSongCount: 0,
  }),
  computed: {
    songsPlayed() {
      return this.stats.server['# songs played'] ?? 500
    },
  },
  mounted() {
    setTimeout(() => {
      this.numberUpper = setInterval(this.numberUp, 4)
    }, 1000)
  },
  methods: {
    numberUp() {
      if (this.intermediateSongCount < this.songsPlayed) {
        this.intermediateSongCount++
      } else {
        clearInterval(this.numberUpper)
      }
    },
  },
}
</script>
