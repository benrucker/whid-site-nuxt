<template>
  <Whyd2022ChatChartMostReactedToImagesBroken v-if="broken" :stats="stats" />
  <Whyd2022ChatChartMostReactedToImagesFixed v-else :stats="stats" />
</template>

<script>
// This component will handle the animation and the swap to the fixed version

export default {
  props: {
    stats: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      broken: true
    }
  },
  methods: {
    fix() {
      this.broken = false
    }
  }
}
</script>
