<template>
  <Whyd2022ChatChartLeagueVsSomeone
    v-if="leaguers && apexers"
    class="leagueVsApex"
    :league-count="leagueCount"
    :other-count="apexCount"
    other-name="apex"
    :leaguers="leaguers"
    :others="apexers"
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
      rightColor: '#d64d44',
      rightCenterColor: 'rgb(65, 43, 39)',
    }
  },
  computed: {
    leagueCount() {
      return this.stats.server['Number of Game Pings']['@leg']
    },
    apexCount() {
      return this.stats.server['Number of Game Pings']['@gaysex legends']
    },
    leaguePings() {
      return this.stats.server['Number of pings from each user']['@leg']
    },
    apexPings() {
      return this.stats.server['Number of pings from each user'][
        '@gaysex legends'
      ]
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
    apexers() {
      return Object.entries(this.apexPings)
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
      return Math.min(this.leagueCount, this.apexCount)
    },
    maxValue() {
      return Math.max(this.leagueCount, this.apexCount)
    },
  },
}
</script>

<style scoped>
.leagueVsApex {
  animation: fade-in 0.5s ease-in-out;
}
</style>
