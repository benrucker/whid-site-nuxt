<template>
  <div id="graph-root" ref="root">
    <div class="title text-center">
      <h4>Most Used Emojis! 🎉</h4>
    </div>
    <div id="canvas-size" ref="canvasSize">
      <canvas :ref="'canvas'"></canvas>
    </div>
    <img
      v-for="emoji in emojis"
      :id="emoji"
      :key="emoji"
      :src="`/whyd/2022/emojis/${emoji}.png`"
      hidden
      class="cloud-emoji"
    />
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
      ranks: {},
      emojis: [],
      emojiPlanets: [],
      counts: [],
      maxCount: 0,
      minCount: 0,
      minScale: 20,
      maxScale: 50,

      intervals: 0,
      resizeListener: new AbortController()
    }
  },
  mounted() {
    this.ranks = this.stats.server.mostUsedEmojis
    this.emojis = this.ranks.map((x) => x.emoji)
    this.counts = this.ranks.map((x) => x.count.toLocaleString())
    this.maxCount = Math.max(...this.ranks.map((x) => x.count))
    this.minCount = Math.min(...this.ranks.map((x) => x.count))
    window.addEventListener(
      'resize',
      () => {
        this.resizeCanvas()
      },
      { signal: this.resizeListener.signal }
    )

    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy() {
    this.intervals.forEach(clearInterval)
    this.resizeListener.abort()
  },
  methods: {
    init() {
      this.resizeCanvas()

      this.emojiPlanets = this.ranks.map(({ emoji, count }) => {
        const size =
          ((count - this.minCount) / (this.maxCount - this.minCount)) *
            (this.maxScale - this.minScale) +
          this.minScale
        return new Emoji(
          document.getElementById(emoji),
          Math.random() * (this.$refs.canvas.width - size),
          Math.random() * (this.$refs.canvas.height - size),
          size
        )
      })

      this.intervals = [
        setInterval(() => {
          this.render()
        }, 30),
        setInterval(() => {
          this.emojiPlanets.forEach((planet) => {
            planet.squish()
          })
        }, 500)
      ]
    },
    resizeCanvas() {
      const canvas = this.$refs.canvas
      const size = this.$refs.canvasSize
      const dpr = window.devicePixelRatio
      const rect = size.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.getContext('2d').scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    },
    async render() {
      const ctx = this.$refs.canvas.getContext('2d')

      const width = this.$refs.canvas.width
      const height = this.$refs.canvas.height

      const prevFrame = ctx.getImageData(0, 0, width, height)
      ctx.clearRect(0, 0, width, height)

      ctx.globalAlpha = 0.4
      ctx.drawImage(await createImageBitmap(prevFrame), 0, 0)
      ctx.globalAlpha = 1

      this.emojiPlanets.forEach((planet, index) => {
        this.emojiPlanets.slice(index + 1).forEach((other) => {
          planet.collide(other)
        })
      })

      this.emojiPlanets.forEach((planet) => {
        planet.move(0.1)
        planet.clip(0, width, 0, height)
        planet.draw(ctx)
      })
    }
  }
}

class Emoji {
  constructor(emoji, x, y, diameter) {
    this.emoji = emoji
    this.x = x
    this.y = y
    this.xvel = Math.random()
    this.yvel = Math.random()
    this.diameter = diameter
    this.mass = diameter * diameter
    this.squishValue1 = 0
    this.squishValue2 = 0
    this.squishValue3 = 0
    this.squishValue4 = 0
    this.squish()
  }

  draw(ctx) {
    ctx.drawImage(
      this.emoji,
      this.x + this.squishValue1,
      this.y + this.squishValue2,
      this.diameter + this.squishValue3,
      this.diameter + this.squishValue4
    )
  }

  squish() {
    function calc() {
      return (Math.random() - 0.5) * 4
    }
    this.squishValue1 = calc()
    this.squishValue2 = calc()
    this.squishValue3 = calc()
    this.squishValue4 = calc()
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
}

canvas {
  position: absolute;
  top: 0;
  left: 10px;
  width: 100%;
  height: 100%;
}

#canvas-size {
  position: relative;
  width: 95%;
  height: 200px;
  margin-right: 0 20px 0 10px;
}
</style>
