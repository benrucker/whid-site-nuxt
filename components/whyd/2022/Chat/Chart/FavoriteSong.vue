<template>
  <Whyd2022ChatChartMusic
    title="talkxture"
    subtitle="what has ben done?"
    bg-img="/whyd/2022/music/album.png"
    song="/whyd/2022/music/song.wav"
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
  data() {
    return {
      rootRef: null,
      bgRef: null,
    }
  },
}
</script>
