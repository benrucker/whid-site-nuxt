<template>
  <div class="bg"><img ref="bg" :src="src" /></div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      bgRef: null,
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      raf: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.bgRef = this.$refs.bg
    })
  },
  methods: {
    moveImg(x, y) {
      if (this.raf == null) {
        this.raf = window.requestAnimationFrame(this.updateImg)
      }
      this.targetX = x
      this.targetY = y
    },
    updateImg() {
      this.currentX = (this.targetX - this.currentX) * 0.1 + this.currentX
      this.currentY = (this.targetY - this.currentY) * 0.1 + this.currentY

      this.bgRef.style.transform =
        'translate(' + this.currentX * 10 + 'px, ' + this.currentY * 10 + 'px)'

      if (
        Math.abs(this.currentX - this.targetX) > 0.01 ||
        Math.abs(this.currentY - this.targetY) > 0.01
      ) {
        this.raf = window.requestAnimationFrame(this.updateImg)
      } else {
        this.raf = null
      }
    }
  }
}
</script>

<style>
.favorite-song .bg img {
  filter: blur(10px) brightness(0.7);
  width: 150%;
  position: absolute;
  top: -25%;
  left: -25%;
}
</style>
