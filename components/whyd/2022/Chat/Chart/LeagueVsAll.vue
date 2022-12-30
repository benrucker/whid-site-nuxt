<template>
  <Whyd2022ChatChartLeagueVsSomeone
    class="leagueVsAll"
    :league-count="leagueCount"
    :other-count="otherCount"
    other-name="anything
other than
league"
    :leaguers="leaguers"
    :others="others"
    :min-value="minValue"
    :max-value="maxValue"
    :other-color="rightColor"
    :other-center-color="rightCenterColor"
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
      rightColor: '#444dd6',
      rightCenterColor: 'rgb(39, 43, 65)',
    }
  },
  computed: {
    leagueCount() {
      return this.stats.server['Number of Game Pings']['@leg']
    },
    otherCount() {
      return this.stats.server['Number of Game Pings'].allOther
    },
    leaguePings() {
      return this.stats.server['Number of pings from each user']['@leg']
    },
    otherPings() {
      return this.stats.server['Number of pings from each user'].allOther
    },
    leaguers() {
      return Object.entries(this.leaguePings)
        .filter(([_, count]) => count > 0)
        .map(([id, count]) => {
          return {
            name: this.stats.server.idsToNames[id],
            pings: count,
            avatar: this.stats.server.idsToAvatars[id],
          }
        })
    },
    others() {
      return Object.entries(this.otherPings)
        .filter(([_, count]) => count > 0)
        .map(([id, count]) => {
          return {
            name: this.stats.server.idsToNames[id],
            pings: count,
            avatar: this.stats.server.idsToAvatars[id],
          }
        })
    },
    minValue() {
      return Math.min(this.leagueCount, this.otherCount)
    },
    maxValue() {
      return Math.max(this.leagueCount, this.otherCount)
    },
  },
}
</script>

<style scoped>
.leagueVsAll {
  animation: fade-in 0.5s ease-in-out;
}
</style>
