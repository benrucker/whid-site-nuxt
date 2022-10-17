<template>
  <div>
    <div class="title text-center">
      <h4>Who sent the most messages?</h4>
    </div>
    <div id="messages">
      <Whyd2022EchartBarH
        :bg-color="'transparent'"
        :color="'#4c60f3'"
        :text-color="'#303030'"
        :x-axis="counts"
        :y-axis="users"
        class="chart"
      />
      <div class="text">
        <div
          v-for="(user, i) in users"
          :key="user.name"
          class="row close align-items-center"
        >
          <span :class="'col-1 rank text-center fade fadein-' + (i + 5)">{{
            i + 1
          }}</span>
          <span :class="'col-8 name fade fadein-' + (i + 10)">{{ user }}</span>
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
      users: [],
      counts: []
    }
  },
  mounted() {
    const ranks = this.stats.server.usersRankedByMessageCount
    this.users = ranks.slice(0, 5).map((x) => x.name)
    this.counts = ranks.slice(0, 5).map((x) => x.count.toLocaleString())
  },
  methods: {}
}
</script>

<style scoped>
#messages {
  cursor: default;
  padding-left: 2.3em;
  width: calc(var(--convo-width) - 150px);
  position: relative;
}

.text {
  z-index: 1;
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

.fade {
  animation: 0.5s fadein 0s ease-in-out forwards;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.chart {
  position: absolute;
  width: calc(var(--convo-width) - 150px);
  height: 100%;
  padding-left: 60px;
  padding-top: 0px;
  top: 2px;
  left: 0;
  z-index: 0;
}
</style>
