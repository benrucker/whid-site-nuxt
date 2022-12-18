<template>
  <Whyd2022ChatDiscordMessageBlock :messages="messages.slice(0, 2)" />
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    messages() {
      const threeMostReactedImages = this.stats.server['Most Reacted Image']
      const ids = Object.keys(threeMostReactedImages).slice(0, 2)
      return [threeMostReactedImages[ids[0]], threeMostReactedImages[ids[1]]]
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
