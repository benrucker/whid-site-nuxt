<template>
  <div id="graph-root" ref="root">
    <div class="title text-center">
      <h4>Most Used <span>(Custom)</span> Emojis! 🎉</h4>
    </div>
    <div id="canvas-size" ref="canvas">
      <img
        v-for="emoji in emojis"
        :id="emoji"
        :key="emoji"
        :src="`/whyd/2022/data/emojis/${emojiNameToFilename[emoji]}`"
        class="cloud-emoji"
        :alt="emoji"
        :title="emoji"
      />
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
      minScale: 20,
      maxScale: 50,
      intervals: 0,
      renderFrame: 0,
      resizeListener: new AbortController(),
    }
  },
  computed: {
    ranks() {
      return this.stats.server['Custom Emojis ranked by usage']
    },
    emojiNameToFilename() {
      return this.stats.server.emojiNameToFilename
    },
    emojis() {
      if (this.ranks == null) return []
      return Object.keys(this.ranks)
    },
    counts() {
      if (this.ranks == null) return []
      return Object.values(this.ranks).map((x) => x.toLocaleString())
    },
    maxCount() {
      if (this.ranks == null) return 0
      return Math.max(...Object.values(this.ranks))
    },
    minCount() {
      if (this.ranks == null) return 0
      return Math.min(...Object.values(this.ranks))
    },
    emojiPlanets() {
      if (this.ranks == null) return []
      return this.emojis.map((emoji) => {
        const count = this.ranks[emoji]
        const size =
          ((count - this.minCount) / (this.maxCount - this.minCount)) *
            (this.maxScale - this.minScale) +
          this.minScale
        return new Emoji(
          document.getElementById(emoji),
          Math.random() *
            (this.$refs.canvas.getBoundingClientRect().width - size),
          Math.random() *
            (this.$refs.canvas.getBoundingClientRect().height - size),
          size,
        )
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy() {
    this.intervals.forEach(clearInterval)
    this.resizeListener.abort()
    cancelAnimationFrame(this.renderFrame)
  },
  methods: {
    init() {
      this.intervals = [
        setInterval(() => {
          this.emojiPlanets.forEach((planet) => {
            planet.squish()
          })
        }, 500),
      ]
      this.renderFrame = requestAnimationFrame(this.render)
      this.prevTime = performance.now()
    },
    render(time) {
      const { width, height } = this.$refs.canvas.getBoundingClientRect()

      this.emojiPlanets.forEach((planet, index) => {
        this.emojiPlanets.slice(index + 1).forEach((other) => {
          planet.collide(other)
        })
      })

      this.emojiPlanets.forEach((planet) => {
        planet.move((time - this.prevTime) / 400)
        planet.clip(0, width, 0, height)
        planet.draw()
      })

      requestAnimationFrame(this.render)
      this.prevTime = time
    },
  },
}

class Emoji {
  constructor(emoji, x, y, diameter) {
    this.emoji = emoji
    this.x = x
    this.y = y
    this.xvel = Math.random() * 50
    this.yvel = Math.random() * 50
    this.diameter = diameter
    this.mass = diameter * diameter
    this.squishValue1 = 0
    this.squishValue2 = 0
    this.squish()

    this.emoji.style.setProperty('width', `${this.diameter}px`)
  }

  draw() {
    this.emoji.style.setProperty(
      'transform',
      `translate(${this.x}px, ${this.y}px) scale(${this.squishValue1}, ${this.squishValue2}) `,
    )
  }

  squish() {
    const maxStretch = 0.1
    function calc() {
      return (Math.random() - 0.5) * maxStretch + 1
    }
    this.squishValue1 = calc()
    this.squishValue2 = calc()
  }

  move(delta) {
    this.x += this.xvel * delta
    this.y += this.yvel * delta
    this.xvel *= 1
    this.yvel *= 1
  }

  clip(minX, maxX, minY, maxY) {
    const elasticity = 0.8
    if (this.x < minX) {
      this.x = minX
      this.xvel *= -elasticity
    } else if (this.x + this.diameter > maxX) {
      this.x = maxX - this.diameter
      this.xvel *= -elasticity
    }
    if (this.y < minY) {
      this.y = minY
      this.yvel *= -elasticity
    } else if (this.y + this.diameter > maxY) {
      this.y = maxY - this.diameter
      this.yvel *= -elasticity
    }
  }

  collide(other) {
    const thisCenterX = this.x + this.diameter / 2
    const thisCenterY = this.y + this.diameter / 2
    const otherCenterX = other.x + other.diameter / 2
    const otherCenterY = other.y + other.diameter / 2
    const dx = thisCenterX - otherCenterX
    const dy = thisCenterY - otherCenterY
    const dist = Math.hypot(dx, dy)

    if (dist < (this.diameter + other.diameter) / 1.5) {
      const angle = Math.atan2(dy, dx)
      const tx = this.x + Math.cos(angle) * this.diameter
      const ty = this.y + Math.sin(angle) * this.diameter
      const ox = other.x - Math.cos(angle) * other.diameter
      const oy = other.y - Math.sin(angle) * other.diameter
      this.xvel = ((tx - ox) / 2) * (other.mass / 2300)
      this.yvel = ((ty - oy) / 2) * (other.mass / 2300)
      other.xvel = ((ox - tx) / 2) * (this.mass / 2300)
      other.yvel = ((oy - ty) / 2) * (this.mass / 2300)
    }
  }
}
</script>

<style scoped>
#graph-root {
  padding: 0.3em;
  cursor: default;
  width: calc(var(--convo-width) - 150px);
  animation: fade-in 0.5s ease-in-out;
}

#canvas-size {
  position: relative;
  width: 95%;
  height: 200px;
  margin: 0 20px 0 10px;
}

.cloud-emoji {
  position: absolute;
  width: 16px;
  /* height: 16px; */
  top: 0px;
  left: 0px;
  transform-origin: center;
  transform: translate(0, 0) scale(1, 1);
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3));
}
</style>
