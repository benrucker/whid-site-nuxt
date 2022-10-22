<template>
  <div
    id="graph-root"
    :ref="'root'"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleTransformPanel($event)"
  >
    <div id="perspective" :ref="'perspective'">
      <div id="foreground" :ref="'foreground'">
        <div id="left">
          <h4 :ref="'league'" class="role league">@league</h4>
          <p :ref="'leagueCount'" class="count">{{ leagueCount }} pings</p>
        </div>
        <div id="right">
          <h4 :ref="'apex'" class="role apex">@apex</h4>
          <p :ref="'apexCount'" class="count">{{ apexCount }} pings</p>
        </div>
      </div>
      <canvas :ref="'canvas'"></canvas>
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
      transformMultiplier: 2,
      rootRef: null,
      perspectiveRef: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.league.style.fontSize = '2rem'
      this.$refs.apex.style.fontSize = '1rem'
    }, 500)
    this.$nextTick(() => {
      this.rootRef = this.$refs.root
      this.perspectiveRef = this.$refs.perspective
    })
  },
  methods: {
    init() {},

    handleTransformPanel(event) {
      this.transformPanel(event)
    },

    transformPanel(event) {
      const mouseX = event.clientX
      const mouseY = event.clientY

      const rootRect = this.rootRef.getBoundingClientRect()

      const rootCenterX = rootRect.left + rootRect.width / 2
      const rootCenterY = rootRect.top + rootRect.height / 2

      const percentX = (mouseX - rootCenterX) / (this.rootRef.clientWidth / 2)
      const percentY = -(mouseY - rootCenterY) / (this.rootRef.clientHeight / 2)

      this.perspectiveRef.style.transform =
        'perspective(400px) rotateY(' +
        percentX * this.transformMultiplier +
        'deg) rotateX(' +
        percentY * this.transformMultiplier +
        'deg)'
    },

    handleMouseEnter() {
      setTimeout(() => {
        this.$refs.perspective.style.transition = ''
      }, 100)
      this.$refs.perspective.style.transition = 'transform 0.1s'
    },

    handleMouseLeave() {
      this.$refs.perspective.style.transition = 'transform 0.1s'
      setTimeout(() => {
        this.$refs.perspective.style.transition = ''
      }, 100)

      this.$refs.perspective.style.transform =
        'perspective(400px) rotateY(0deg) rotateX(0deg)'
    }
  }
}
</script>

<style scoped>
#graph-root {
  position: relative;
  height: 300px;
  width: 400px;
  /* margin: -4px; */

  --league-color: #18191c;
  --apex-color: #d64d44;
}

#perspective {
  position: absolute;
  height: 300px;
  width: 400px;
  transform: perspective(400px) rotateX(0deg) rotateY(0deg);
  transform-style: preserve-3d;
  box-shadow: 1.5rem 2.5rem 5rem 0.7rem rgba(0, 0, 0, 0.13);
  display: flex;
  justify-content: center;
  align-items: center;
}

#foreground {
  height: 100%;
  width: 100%;

  transform: translateZ(80px) scale(0.8);
  transform-style: preserve-3d;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

#left,
#right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.role.league,
.role.apex {
  transform: translate(0, 0);
  transition: font-size 2s ease-in-out;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 10px #fff;
  box-shadow: rgba(0, 0, 0, 0.5) 1.5px 2.5px 10px;
}

.count {
  font-weight: bold;
  color: gray;
  text-shadow: rgba(0, 0, 0, 0.4) 1px 2px 6px;
}

#canvas-size {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 2;
}

canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0px;
  transform: skew(0deg);
  transform-origin: center;
  background-image: radial-gradient(
      circle,
      rgba(17, 231, 238, 0.05) 0%,
      rgba(53, 25, 4, 0.4) 150%
    ),
    linear-gradient(
      to right,
      var(--league-color),
      rgb(31, 13, 13) 50%,
      rgb(39, 26, 26) 50%,
      var(--apex-color)
    );
  opacity: 1;
  z-index: 0;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.5) 0 0 15px;
}
</style>
