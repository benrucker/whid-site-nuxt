<template>
  <div
    ref="root"
    class="favorite-song"
    @mousemove="handleTransformPanel($event)"
  >
    <Whyd2022ChatChartMusicBackground ref="bg" src="/whyd/2022/album.png" />
    <div class="text">
      <h2>{{ intermediateSongCount }} songs played</h2>
      <h4 class="text-muted">rookie numbers 😏</h4>
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
  data: () => ({
    rootRef: null,
    bgRef: null,
    numberUpper: 0,
    intermediateSongCount: 0
  }),
  computed: {
    songsPlayed() {
      return this.stats.server.songsPlayed ?? 500
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.rootRef = this.$refs.root
      this.bgRef = this.$refs.bg
    })
    setTimeout(() => {
      // TODO check if this interval delay is still good with the real number
      this.numberUpper = setInterval(this.numberUp, 16)
    }, 1000)
  },
  methods: {
    handleTransformPanel(event) {
      const mouseX = event.clientX
      const mouseY = event.clientY

      const rootRect = this.rootRef.getBoundingClientRect()

      const rootCenterX = rootRect.left + rootRect.width / 2
      const rootCenterY = rootRect.top + rootRect.height / 2

      const percentX = -(mouseX - rootCenterX) / (this.rootRef.clientWidth / 2)
      const percentY = -(mouseY - rootCenterY) / (this.rootRef.clientHeight / 2)

      this.bgRef.moveImg(percentX, percentY)
    },
    numberUp() {
      if (this.intermediateSongCount < this.songsPlayed) {
        this.intermediateSongCount++
      } else {
        clearInterval(this.numberUpper)
      }
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
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  overflow: clip;

  animation: fade-in 2s ease-in-out;

  color: white;
}

.favorite-song .bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  overflow: clip;
  border-radius: 30px;
}

.favorite-song .text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 0;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.favorite-song .controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;

  padding: 0px 5px;
  margin: 0px 30px;

  height: 30px;
  /* don't make the width <80% because the firefox slider won't shrink */
  width: 80%;

  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.favorite-song .controls input {
  /* "input slider" look different on each browser and it's hard to restyle it */
  /* so we are settling for just changing its width with flex-grow */

  justify-self: stretch;
  flex-grow: 1;
}

.favorite-song .controls div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30px;
  cursor: pointer;
}

.favorite-song .controls svg {
  width: 80%;
  height: 80%;
}

.favorite-song audio {
}

.favorite-song .seek-slider {
}
</style>
