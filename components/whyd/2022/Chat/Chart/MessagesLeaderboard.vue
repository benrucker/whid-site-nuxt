<template>
  <div v-if="counts.length" class="messagesLeaderboard">
    <div class="lb-title text-center">
      <h4>Who sent the most messages?</h4>
    </div>
    <div id="lb-messages">
      <Whyd2022ChatChartEchartBarH
        :bg-color="'transparent'"
        :color="'#8677cb'"
        :text-color="'#303030'"
        :x-axis="counts"
        :y-axis="users"
        class="lb-chart"
      />
      <div class="lb-text">
        <div
          v-for="(user, i) in users"
          :key="user.name"
          class="row close align-items-center"
        >
          <span class="col-1 lb-rank text-center lb-fade">{{ i + 1 }}</span>
          <span class="col-8 lb-name lb-fade">{{ user }}</span>
          <span class="col-2 lb-count text-center lb-fade">{{
            counts[i].toLocaleString()
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
      required: true,
    },
  },
  data() {
    return {
      users: [],
      counts: [],
    }
  },
  mounted() {
    const ranks = this.stats.server['Rank by Number of Messages per User']
    const ids = Object.keys(ranks).slice(0, 5)
    this.users = ids.map((id) => this.stats.server.idsToNames[id])
    this.counts = ids.map((x) => ranks[x])
  },
  methods: {},
}
</script>

<style>
.messagesLeaderboard {
  animation: fade-in 0.5s ease-in-out 0.1s both;
}

#lb-messages {
  cursor: default;
  padding-left: 2.3em;
  width: calc(var(--convo-width) - 150px);
  position: relative;
}

.lb-text {
  z-index: 1;
}

.lb-rank {
  font-weight: bold;
  font-style: italic;
  font-size: 2em;
}
.lb-name {
  padding-left: 0.5em;
  font-size: 1.5em;
}
.lb-count {
  font-size: 1em;
  padding-left: 1em;
}

.lb-fade {
  animation: 0.5s lb-fadein 0s ease-in-out forwards;
}

@keyframes lb-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.lb-chart {
  position: absolute;
  width: calc(var(--convo-width) - 150px);
  height: 100%;
  padding-left: 0;
  padding-top: 0px;
  top: 2px;
  left: 0;
  z-index: 0;
  transform: skew(-9deg);
}
</style>
