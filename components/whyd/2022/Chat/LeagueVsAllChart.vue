<template>
  <Whyd2022ChatLeagueVsSomeoneChart
    :league-count="leagueCount"
    :other-count="apexCount"
    other-name="everyone else"
    :leaguers="leaguers"
    :apexers="apexers"
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
      leaguers: {},
      apexers: {}
    }
  },
  mounted() {
    this.leaguers = [
      { name: 'fops', pings: 52, avatar: '/whyd/2022/emojis/cheeto.png' },
      { name: 'noss', pings: 42, avatar: '/whyd/2022/emojis/cheeto.png' },
      { name: 'El Jefe', pings: 32, avatar: '/whyd/2022/emojis/cheeto.png' },
      {
        name: 'bebenebenebeb',
        pings: 22,
        avatar: '/whyd/2022/emojis/cheeto.png'
      },
      { name: 'JermaBot', pings: 12, avatar: '/whyd/2022/emojis/cheeto.png' }
    ]
    this.apexers = [
      { name: 'green', pings: 52, avatar: '/whyd/2022/emojis/cheeto.png' },
      { name: 'chris', pings: 42, avatar: '/whyd/2022/emojis/cheeto.png' },
      { name: 'kian', pings: 32, avatar: '/whyd/2022/emojis/cheeto.png' },
      { name: 'fops2', pings: 22, avatar: '/whyd/2022/emojis/cheeto.png' },
      { name: 'shigure', pings: 12, avatar: '/whyd/2022/emojis/cheeto.png' }
    ]

    this.leagueCount = 500
    this.apexCount = 200
  }
}
</script>

<style></style>
