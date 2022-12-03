<template>
  <div
    ref="root"
    class="favorite-song"
    @click.stop="onClick($event)"
    @mousemove="handleTransformPanel($event)"
    @mouseenter="handleMouseEnter()"
  >
    <Whyd2022ChatChartMusicBackground ref="bg" :src="bgImg" />
    <div class="text">
      <h2>{{ title }}</h2>
      <h4 class="text-muted">{{ subtitle }}</h4>
    </div>
    <Whyd2022ChatChartMusicControls v-if="song" :song="song" />
  </div>
</template>

<script>
export default {
  props: {
    subtitle: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    bgImg: {
      type: String,
      default: ''
    },
    song: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      rootRef: null,
      bgRef: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.rootRef = this.$refs.root
      this.bgRef = this.$refs.bg
    })
  },
  methods: {
    onClick(event) {
      event.preventDefault()
    },
    handleTransformPanel(event) {
      this.bgRef.handleTransformPanel(event)
    },
    handleMouseEnter() {
      this.bgRef.handleMouseEnter()
    }
  }
}
</script>

<style scoped>
.favorite-song {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 240px;
  padding: 40px 0;
  row-gap: 30px;
  /* border: 2px solid rgba(0, 0, 0, 0.2); */
  border-radius: 30px;
  overflow: clip;

  animation: fade-in 2s ease-in-out;

  color: white;

  position: relative;
}

.favorite-song .text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 0;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
