<template>
  <WhydEchartBarH
    ref="channelBarChart"
    :title="'Messages'"
    :bgColor="'#222'"
    :color="'#f3df4c'"
    :textColor="'#fff'"
  />
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async init(urlPrefix) {
      let channelCounts = await fetch(
        `${urlPrefix}/messagesByChannel.json`
      ).then((res) => res.json());
      let channels = [
        "dont",
        "japan",
        "no-pls",
        "dnd",
        "dev",
        "website",
        "league",
        "admin",
        "whidiscussion",
        "chat\u300c\u96d1\u8ac7\u300d",
        "spam\u300c\u30b9\u30d1\u30e0\u300d",
        "dégoûtants-américains",
        "do",
        "videos-and-music",
        "gamers",
        "politics",
        "spam",
        "the-real-us",
        "lowlights",
      ];
      let axis = channels.reverse();
      let msgCounts = channels.map(x => channelCounts[x]);
      this.$refs.channelBarChart.init(axis, msgCounts);
    },
  },
};
</script>