<template>
  <Whyd2022ChatChartLeagueVsSomeone
    :league-count="leagueCount"
    :other-count="otherCount"
    other-name="everything
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
      rightColor: '#444dd6',
      rightCenterColor: 'rgb(39, 43, 65)'
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
          avatar: this.stats.server.avatars[id]
        }
      })
    this.others = Object.entries(otherPings)
      .filter(([_, count]) => count > 0)
      .map(([id, count]) => {
        return {
          name: this.stats.server.idsToNames[id],
          pings: count,
          avatar: this.stats.server.avatars[id]
        }
      })
  }
}
</script>

<style></style>
