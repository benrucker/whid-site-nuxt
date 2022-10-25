<template>
  <Whyd2022ChatLeagueVsSomeoneChart
    v-if="leaguers && apexers"
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
      default: () => ({})
    }
  },
  data() {
    return {
      leagueCount: 0,
      apexCount: 0,
      leaguers: [],
      apexers: [],
      minValue: 0,
      maxValue: 0,
      rightColor: '#d64d44',
      rightCenterColor: 'rgb(65, 43, 39)'
    }
  },
  mounted() {
    this.leagueCount = this.stats.server['Number of Game Pings']['@leg']
    this.apexCount =
      this.stats.server['Number of Game Pings']['@gaysex legends']

    const leaguePings =
      this.stats.server['Number of pings from each user']['@leg']
    const apexPings =
      this.stats.server['Number of pings from each user']['@gaysex legends']

    this.leaguers = Object.entries(leaguePings)
      .filter(([_, count]) => count > 0)
      .map(([id, count]) => {
        return {
          name: this.stats.server.idsToNames[id],
          pings: count,
          avatar: '/whyd/2022/emojis/cheeto.png' // TODO this.stats.server.avatars[id]
        }
      })
    this.apexers = Object.entries(apexPings)
      .filter(([_, count]) => count > 0)
      .map(([id, count]) => {
        return {
          name: this.stats.server.idsToNames[id],
          pings: count,
          avatar: '/whyd/2022/emojis/cheeto.png' // TODO this.stats.server.avatars[id]
        }
      })

    const otherCount = this.stats.server['Number of Game Pings'].allOther
    this.minValue = Math.min(this.leagueCount, otherCount, this.apexCount)
    this.maxValue = Math.max(this.leagueCount, otherCount, this.apexCount)
  }
}
</script>

<style></style>
