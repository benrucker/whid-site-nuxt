<template>
  <Whyd2022ChatChartMostUsedReactionsBroken v-if="broken" :stats="stats" />
  <Whyd2022ChatChartMostUsedReactionsFixed v-else :stats="stats" />
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
