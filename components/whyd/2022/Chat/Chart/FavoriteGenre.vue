<template>
  <Whyd2022ChatChartMusic
    :title="favoriteGenre"
    :subtitle="`classy 😏`"
    bg-img="/whyd/2022/data/emojis/myson.png"
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
      return this.stats.server.favGenre ?? 'Neuro-edgy-ID-hyper-country'
    },
  },
}
</script>
