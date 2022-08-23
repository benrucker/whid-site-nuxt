<template>
  <WhydEchartBarH
    ref="channelBarChart"
    :title="'Messages'"
    :bg-color="'#222'"
    :color="'#f3df4c'"
    :text-color="'#fff'"
  />
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    async init (urlPrefix) {
      const channelCounts = await fetch(
        `${urlPrefix}/messagesByChannel.json`
      ).then(res => res.json())
      const channels = [
        'dont',
        'japan',
        'no-pls',
        'dnd',
        'dev',
        'website',
        'league',
        'admin',
        'whidiscussion',
        'chat\u300C\u96D1\u8AC7\u300D',
        'spam\u300C\u30B9\u30D1\u30E0\u300D',
        'dégoûtants-américains',
        'do',
        'videos-and-music',
        'gamers',
        'politics',
        'spam',
        'the-real-us',
        'lowlights'
      ]
      const axis = channels.reverse()
      const msgCounts = channels.map(x => channelCounts[x])
      this.$refs.channelBarChart.init(axis, msgCounts)
    }
  }
}
</script>
