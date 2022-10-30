<template>
  <div
    ref="root"
    class="favorite-song"
    @click.stop="onClick($event)"
    @mousemove="handleTransformPanel($event)"
  >
    <div class="bg"><img ref="bg" src="/whyd/2022/album.png" /></div>
    <div class="text">
      <h2>fav song title</h2>
      <h4 class="text-muted">fav song artist</h4>
    </div>
    <div class="controls">
      <div v-if="playing" class="pause" @click="onPauseClick">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-pause-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"
          />
        </svg>
      </div>
      <div v-else class="play" @click="onPlayClick">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-play-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
          />
        </svg>
      </div>
      <input
        ref="seekSlider"
        type="range"
        class="seek-slider"
        max="100"
        value="0"
        @change="onSeekSliderChange"
        @mousedown="onSeekSliderMouseDown"
        @mouseup="onSeekSliderMouseUp"
      />
      <div v-if="muted" class="unmute" @click="onUnmuteClick">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-volume-mute-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </div>
      <div v-else class="mute" @click="onMuteClick">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-volume-up-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
          />
          <path
            d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
          />
          <path
            d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
          />
        </svg>
      </div>
    </div>
    <audio
      ref="audio"
      :src="'/whyd/2022/song.wav'"
      autoplay
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
    ></audio>
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
    seeking: false,
    playing: false,
    muted: false,
    rootRef: null,
    bgRef: null
  }),
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
    onPlay() {
      this.playing = true
    },
    onPause() {
      this.playing = false
    },
    onEnded() {
      this.playing = false
    },
    onLoadedMetadata() {
      this.$refs.seekSlider.max = Math.floor(this.$refs.audio.duration)
      this.$refs.audio.volume = 0.5
    },
    onSeekSliderChange() {
      this.$refs.audio.currentTime = this.$refs.seekSlider.value
    },
    onTimeUpdate() {
      if (!this.seeking) {
        this.$refs.seekSlider.value = Math.floor(this.$refs.audio.currentTime)
      }
    },
    onSeekSliderMouseDown() {
      this.seeking = true
    },
    onSeekSliderMouseUp() {
      this.seeking = false
    },
    onPlayClick() {
      this.$refs.audio.play()
    },
    onPauseClick() {
      this.$refs.audio.pause()
    },
    onMuteClick() {
      this.muted = true
      this.$refs.audio.muted = true
    },
    onUnmuteClick() {
      this.muted = false
      this.$refs.audio.muted = false
    },
    handleTransformPanel(event) {
      const mouseX = event.clientX
      const mouseY = event.clientY

      const rootRect = this.rootRef.getBoundingClientRect()

      const rootCenterX = rootRect.left + rootRect.width / 2
      const rootCenterY = rootRect.top + rootRect.height / 2

      const percentX = -(mouseX - rootCenterX) / (this.rootRef.clientWidth / 2)
      const percentY = -(mouseY - rootCenterY) / (this.rootRef.clientHeight / 2)

      this.bgRef.style.transform =
        'translate(' + percentX * 10 + 'px, ' + percentY * 10 + 'px)'
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

.favorite-song .bg img {
  filter: blur(10px) brightness(0.7);
  width: 150%;
  position: absolute;
  top: -25%;
  left: -25%;
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
