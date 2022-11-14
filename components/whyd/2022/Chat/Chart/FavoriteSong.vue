<template>
  <Whyd2022ChatChartMusic
    title="talkxture"
    subtitle="what has ben done?"
    bg-img="/whyd/2022/album.png"
    song="/whyd/2022/song.wav"
  />
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      rootRef: null,
      bgRef: null
    }
  }
}
</script>
