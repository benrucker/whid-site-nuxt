<template>
  <Whyd2022ChatChartMusic
    :title="`${intermediateSongCount} songs played`"
    :subtitle="`rookie numbers 😏`"
    bg-img="/whyd/2022/data/emojis/ahegao1.png"
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
      return this.stats.server.songsPlayed ?? 500
    },
  },
  mounted() {
    setTimeout(() => {
      // TODO check if this interval delay is still good with the real number
      this.numberUpper = setInterval(this.numberUp, 16)
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
