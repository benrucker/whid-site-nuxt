<template>
  <Whyd2022ChatLeagueVsSomeoneChart
    :league-count="leagueCount"
    :other-count="otherCount"
    other-name="everyone
else"
    :leaguers="leaguers"
    :others="others"
    :min-value="minValue"
    :max-value="maxValue"
    :other-color="rightColor"
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
      others: [],
      minValue: 0,
      maxValue: 0,
      rightColor: '#444dd6'
    }
  },
  mounted() {
    this.leagueCount = this.stats.server['Number of Game Pings']['@leg']
    this.otherCount = this.stats.server['Number of Game Pings'].allOther

    const leaguePings =
      this.stats.server['Number of pings from each user']['@leg']
    const otherPings =
      this.stats.server['Number of pings from each user'].allOther

    this.leaguers = Object.entries(leaguePings)
      .filter(([_, count]) => count > 0)
      .map(([id, count]) => {
        return {
          name: this.stats.server.idsToNames[id],
          pings: count,
          avatar: '/whyd/2022/emojis/cheeto.png' // TODO this.stats.server.avatars[id]
        }
      })
    this.others = Object.entries(otherPings)
      .filter(([_, count]) => count > 0)
      .map(([id, count]) => {
        return {
          name: this.stats.server.idsToNames[id],
          pings: count,
          avatar: '/whyd/2022/emojis/cheeto.png' // TODO this.stats.server.avatars[id]
        }
      })
  }
}
</script>

<style></style>
