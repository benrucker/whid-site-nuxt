<template>
  <Whyd2022ChatChartMusic
    :header="favoriteGenre"
    :subtitle="`${favoriteGenreCount} songs played`"
    bg-img="/whyd/2022/music/electro-art.jpg"
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
  computed: {
    favoriteGenre() {
      return Object.keys(this.stats.server['favorite genre of music'])[0]
    },
    favoriteGenreCount() {
      return Object.values(this.stats.server['favorite genre of music'])[0]
    },
  },
}
</script>
