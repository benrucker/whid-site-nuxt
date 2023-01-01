<template>
  <Whyd2022ChatChartMusic
    :header="favoriteSong.title"
    :subtitle="favoriteSong.artist"
    bg-img="/whyd/2022/music/yijianmei.jpg"
    song="/whyd/2022/music/yijianmei.mp3"
    :title="`Played at least ${favoriteSong.plays} times!`"
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
    favoriteSong() {
      return this.stats.server['most played song']
    },
  },
}
</script>
