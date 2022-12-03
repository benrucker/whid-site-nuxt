<template>
  <div ref="root" class="bg">
    <img ref="bg" :src="src" class="bgimg" />
    <div ref="dots" class="dots" />
    <div class="musicShadow" />
  </div>
</template>

<script>
const lerpEnter = 0.2
const lerpWithin = 1

export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      rootRef: null,
      bgRef: null,
      bgTargetX: 0,
      bgTargetY: 0,
      bgCurrentX: 0,
      bgCurrentY: 0,
      bgRaf: null,
      dotsRef: null,
      dotsTargetX: 0,
      dotsTargetY: 0,
      dotsCurrentX: 0,
      dotsCurrentY: 0,
      dotsRaf: null,
      lerpFraction: lerpEnter
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.rootRef = this.$refs.root
      this.bgRef = this.$refs.bg
      this.dotsRef = this.$refs.dots
    })
  },
  methods: {
    moveImg(x, y) {
      if (this.bgRaf == null) {
        this.bgRaf = window.requestAnimationFrame(this.updateImg)
      }
      this.bgTargetX = x
      this.bgTargetY = y
    },
    moveDots(x, y) {
      if (this.dotsRaf == null) {
        this.dotsRaf = window.requestAnimationFrame(this.updateDots)
      }
      this.dotsTargetX = x
      this.dotsTargetY = y
    },
    updateImg() {
      ;[this.bgCurrentX, this.bgCurrentY, this.bgRaf] = this.updateThing(
        this.bgCurrentX,
        this.bgCurrentY,
        this.bgTargetX,
        this.bgTargetY,
        this.rafBg,
        this.updateImg,
        this.bgRef
      )
    },
    updateDots() {
      ;[this.dotsCurrentX, this.dotsCurrentY, this.dotsRaf] = this.updateThing(
        this.dotsCurrentX,
        this.dotsCurrentY,
        this.dotsTargetX,
        this.dotsTargetY,
        this.rafDots,
        this.updateDots,
        this.dotsRef
      )
    },
    updateThing(currentX, currentY, targetX, targetY, raf, method, ref) {
      currentX = (targetX - currentX) * this.lerpFraction + currentX
      currentY = (targetY - currentY) * this.lerpFraction + currentY

      ref.style.transform =
        'translate(' + currentX * 10 + 'px, ' + currentY * 10 + 'px)'

      if (
        Math.abs(currentX - targetX) > 0.01 ||
        Math.abs(currentY - targetY) > 0.01
      ) {
        raf = window.requestAnimationFrame(method)
      } else {
        this.lerpFraction = lerpWithin
        raf = null
      }

      return [currentX, currentY, raf]
    },
    handleTransformPanel(event) {
      const mouseX = event.clientX
      const mouseY = event.clientY

      const rootRect = this.rootRef.getBoundingClientRect()

      const rootCenterX = rootRect.left + rootRect.width / 2
      const rootCenterY = rootRect.top + rootRect.height / 2

      const percentX = -(mouseX - rootCenterX) / (this.rootRef.clientWidth / 2)
      const percentY = -(mouseY - rootCenterY) / (this.rootRef.clientHeight / 2)

      this.moveImg(percentX, percentY)
      this.moveDots(percentX / 3, percentY / 3)
    },
    handleMouseEnter() {
      this.lerpFraction = lerpEnter
    }
  }
}
</script>

<style scoped>
.bg {
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

.bgimg {
  filter: blur(10px) brightness(0.7);
  width: 150%;
  position: absolute;
  top: -25%;
  left: -25%;
}

.dots {
  background: radial-gradient(rgba(255, 255, 255, 0.2) 8%, transparent 8%);
  background-position: 0% 0%;
  background-size: 24px 24px;
  transition: background-position 350ms ease;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.dots:hover {
  background-position: -10% 0%;
}

.musicShadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  border: solid 5px rgba(20, 20, 20, 0);
  box-shadow: inset 0 0 5px black;

  border-radius: 30px;
}
</style>
