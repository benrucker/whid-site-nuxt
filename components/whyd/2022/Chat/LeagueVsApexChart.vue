<template>
  <div id="graph-root" ref="root">
    <!-- <h4>league vs apex</h4> -->
    <canvas :ref="'canvas'"></canvas>
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
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    }, 500)
  },
  methods: {
    init() {
      // this.width = this.$parent.$refs.bubble.offsetWidth
      // this.height = this.$parent.$refs.bubble.offsetHeight
    }
  }
}
</script>

<style scoped>
#graph-root {
  position: relative;
  height: 400px;
  width: 400px;
  margin: -4px;
}

#canvas-size {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  /* background-color: yellow; */
  opacity: 0.5;
  z-index: 2;
}

canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 25px;
  transform: skew(9deg);
  background-image: linear-gradient(
    to right,
    rgb(212, 42, 42),
    rgb(31, 13, 13) 50%,
    rgb(39, 26, 26) 50%,
    rgb(236, 117, 117)
  );
  opacity: 1;
  z-index: 10;
}
</style>
