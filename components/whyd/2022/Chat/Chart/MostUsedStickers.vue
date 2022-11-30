<template>
  <div class="stickersChart" @click.stop="handleClick($event)">
    <svg
      class="noise"
      viewBox="0 100 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>

      <rect filter="url(#noiseFilter)" />
    </svg>
    <div class="overlay"></div>
    <div class="notSvg">
      <h1>most used <span class="gm">s</span>tickers</h1>
      <div ref="stickers" class="stickers">
        <img
          v-for="sticker in stickers"
          :id="sticker.name"
          :key="sticker.name"
          :ref="sticker.name"
          class="sticker"
          :src="sticker.url"
          :alt="sticker.name"
        />
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
      stickers: {}
    }
  },
  mounted() {
    this.stickers = this.stats.server['Top 5 Stickers'] ?? [
      { name: 'myson', url: '/whyd/2022/emojis/myson.png', count: 500 },
      { name: 'sonochess', url: '/whyd/2022/emojis/myson.png', count: 300 },
      { name: 'eyebrow', url: '/whyd/2022/emojis/myson.png', count: 200 },
      { name: 'wave', url: '/whyd/2022/emojis/myson.png', count: 100 },
      { name: 'DEAL', url: '/whyd/2022/emojis/myson.png', count: 10 }
    ]
    setTimeout(this.resizeStickers, 60)
  },
  methods: {
    resizeStickers() {
      let index = 0
      for (const stickerElement of this.$refs.stickers.children) {
        const stickerInfo = this.stickers.find(
          (sticker) => sticker.name === stickerElement.id
        )
        const stickerSize = stickerInfo.count / 10 + 50

        const stickerXPositionPercent = Math.max(
          -10,
          Math.random() * 100 - stickerSize / 2
        )
        const stickerYPositionPercent = Math.min(
          100,
          Math.random() * 100 - stickerSize / 2
        )

        stickerElement.style.width = `${stickerSize}px`
        stickerElement.style.transform = `scale(100) rotate(${
          Math.random() * 120 - 60
        }deg)`
        stickerElement.style.animationDelay = `${index * 0.5}s`

        stickerElement.style.top = `${stickerYPositionPercent}%`
        stickerElement.style.left = `${stickerXPositionPercent}%`

        index += 1
      }
    },
    handleClick(event) {
      setTimeout(this.resizeStickers)
      event.preventDefault()
    }
  }
}
</script>

<style scoped>
.stickersChart {
  font-family: Brush Script MT;
  border-radius: 20px;
  padding: 20px;
  border: inset 5px;
  font-size: 2em;

  color: #151515;
  text-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);

  position: relative;

  user-select: none;

  animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}

rect {
  width: 100%;
  height: 1000px;
  top: -10px;
}

svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  filter: contrast(170%) brightness(1000%);
  background: linear-gradient(45deg, rgb(112, 23, 129), rgba(0, 0, 0, 0));
}

span.gm {
  font-family: sans-serif;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  background: moccasin;
  mix-blend-mode: multiply;
}

div .notSvg {
  isolation: isolate;
}

.stickers {
  height: 200px;
  width: 100%;
  position: relative;
}

.sticker {
  opacity: 0;
  transform: scale(100) rotate(90deg);
  animation-delay: 1s;
  animation: place-sticker 1s ease-in both;

  position: absolute;

  filter: drop-shadow(10px 10px 5px rgba(0, 0, 0, 0.3));
}

@keyframes place-sticker {
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
</style>
