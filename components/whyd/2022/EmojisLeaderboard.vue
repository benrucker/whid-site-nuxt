<template>
  <div id="graph-root">
    <div class="title text-center">
      <h4>Most Used Emojis! 🎉</h4>
    </div>
    <div id="messages">
      <Whyd2022EchartBarH
        :bg-color="'transparent'"
        :color="'#4c60f3'"
        :text-color="'#303030'"
        :x-axis="counts"
        :y-axis="emojis"
        class="chart"
      />
      <div class="text">
        <div
          v-for="(emoji, i) in emojis"
          :key="emoji"
          class="row close align-items-center"
        >
          <span :class="'col-1 rank text-center fade fadein-' + (i + 5)">{{
            i + 1
          }}</span>
          <span :class="'col-8 name fade fadein-' + (i + 10)">{{ emoji }}</span>
          <span :class="'col-2 count text-center fade fadein-' + i">{{
            counts[i]
          }}</span>
        </div>
      </div>
    </div>
  </div>
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
      emojis: [],
      counts: []
    }
  },
  mounted() {
    const ranks = this.stats.server.mostUsedEmojis
    this.emojis = ranks.slice(0, 5).map((x) => x.emoji)
    this.counts = ranks.slice(0, 5).map((x) => x.count.toLocaleString())
  },
  methods: {}
}
</script>

<style scoped>
#graph-root {
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  cursor: default;
  width: 50vw;
}

#messages {
  padding-left: 2.3em;
  position: relative;
}

.text {
  z-index: 20;
}

.rank {
  font-weight: bold;
  font-style: italic;
  font-size: 2em;
}
.name {
  padding-left: 0.5em;
  font-size: 1.5em;
}
.count {
  font-size: 1em;
  padding-left: 1em;
}

.unit {
  font-size: 1em;
}

.chart {
  position: absolute;
  width: 50vw;
  height: 100%;
  padding-left: 60px;
  padding-top: 0px;
  top: 2px;
  left: 0;
  z-index: 1;
}
</style>
