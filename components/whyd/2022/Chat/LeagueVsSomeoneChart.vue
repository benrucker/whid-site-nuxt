<template>
  <div
    id="graph-root"
    :ref="'root'"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleTransformPanel($event)"
    @mouseup="handleMouseUp"
  >
    <div id="perspective" :ref="'perspective'">
      <div id="foreground" :ref="'foreground'">
        <div id="left" ref="left">
          <div
            v-for="leaguer of leaguers"
            :id="leaguer.name"
            :key="leaguer.name"
            :class="'image-div'"
          >
            <img :src="leaguer.avatar" />
          </div>
          <h4 :ref="'league'" class="role league">@league</h4>
          <p :ref="'intermediateLeagueCount'" class="count">
            {{ intermediateLeagueCount }} pings
          </p>
        </div>
        <div id="right" ref="right">
          <div
            v-for="apexer of apexers"
            :id="apexer.name"
            :key="apexer.name"
            :class="'image-div'"
          >
            <img :src="apexer.avatar" />
          </div>
          <h4 :ref="'apex'" class="role apex">@{{ otherName }}</h4>
          <p :ref="'intermediateOtherCount'" class="count">
            {{ intermediateOtherCount }} pings
          </p>
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
    },
    leagueCount: {
      type: Number,
      default: 0
    },
    otherCount: {
      type: Number,
      default: 0
    },
    otherName: {
      type: String,
      default: ''
    },
    leaguers: {
      type: Array,
      default: () => []
    },
    apexers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      transformMultiplier: 2,
      rootRef: null,
      perspectiveRef: null,
      intermediateLeagueCount: 0,
      intermediateOtherCount: 0,
      numberUpper: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.moveElementsIntoPlace()
      // this.moveCenterLine(leagueCount, otherCount)
      setTimeout(() => {
        this.avatarWiggler = setInterval(this.wiggleAvatars, 4000)
      }, 100)
      this.numberUpper = setInterval(this.numberUp, 16)
    }, 2000)

    this.$nextTick(() => {
      this.rootRef = this.$refs.root
      this.perspectiveRef = this.$refs.perspective
    })
  },
  destroyed() {
    clearInterval(this.avatarWiggler)
    clearInterval(this.numberUpper)
  },
  methods: {
    moveElementsIntoPlace() {
      this.transformGraphElements(
        'translate3d(25px, 0, 160px)',
        this.$refs.left.children
      )
      this.transformGraphElements(
        'translate3d(0, 0, 60px)',
        this.$refs.right.children
      )
    },
    transformGraphElements(translate, children) {
      for (const child of children) {
        if (child.tagName !== 'DIV') {
          child.style.setProperty('transform', translate)
        } else {
          const data =
            this.leaguers.find((leaguer) => leaguer.name === child.id) ||
            this.apexers.find((apexer) => apexer.name === child.id)
          const scale = data.pings

          const randX = Math.random() * 150 - 75
          const randY = Math.random() * 280 - 140

          child.style.setProperty(
            'transform',
            `translate3d(${randX}px, ${randY}px, ${scale}px) scale(${
              1 + scale / 100
            })`,
            'important'
          )
          child.style.setProperty('opacity', `1`)
        }
      }
    },
    wiggleAvatars() {
      document.querySelectorAll('.image-div img').forEach((img) => {
        const delay = Math.random() * 3000
        setTimeout(() => {
          const randX = Math.random() * 12 - 6
          const randY = Math.random() * 12 - 6
          const randZ = Math.random() * 10 - 5
          img.style.setProperty(
            'transform',
            `translate3d(${randX}px, ${randY}px, ${randZ}px)`
          )
        }, delay)
      })
    },
    moveCenterLine(leagueCount, otherCount) {
      const backgroundElement = this.$refs.canvas
      const percentage = Math.floor(
        (leagueCount / (leagueCount + otherCount)) * 100
      )

      backgroundElement.style.setProperty('--center', `${percentage}%`)
    },
    numberUp() {
      if (this.intermediateLeagueCount < this.leagueCount) {
        this.intermediateLeagueCount++
      }
      if (this.intermediateOtherCount < this.otherCount) {
        this.intermediateOtherCount++
      }

      if (
        this.intermediateLeagueCount >= this.leagueCount &&
        this.intermediateOtherCount >= this.otherCount
      ) {
        clearInterval(this.numberUpper)
      }
    },
    handleTransformPanel(event) {
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
    },
    handleMouseUp() {
      this.moveElementsIntoPlace()
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

  cursor: default;
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

  pointer-events: none;
}

#foreground {
  height: 100%;
  width: 100%;

  transform: translateZ(0) scale(0.8);
  transform-style: preserve-3d;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  pointer-events: none;
}

#left,
#right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transform: translate3d(0, 0, 10px);
  transform-style: preserve-3d;
  transition: transform 5s ease-in-out;

  pointer-events: none;
}

.role.league,
.role.apex {
  transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
  transition: transform 5s ease-in-out;

  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 10px #fff;
  box-shadow: rgba(0, 0, 0, 0.5) 1.5px 2.5px 10px;

  z-index: 2;
}

.count {
  font-weight: bold;
  color: gray;
  text-shadow: rgba(0, 0, 0, 0.6) 1px 2px 6px;

  transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
  transition: transform 5s ease-in-out;

  z-index: 2;
}

#canvas-size {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

.image-div {
  /* transform: translate3d(0, 0, 0); */
  opacity: 0;
  transition: all 5s;
  transform-style: preserve-3d;
  width: 20px;
  height: 20px;

  position: absolute;
}

.image-div img {
  transform: translate3d(0, 0, 0);
  transition: all 5s ease-in-out;
  transform-style: preserve-3d;

  border-radius: 50%;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.5) 1.5px 2.5px 10px;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

canvas {
  --center: 50%;

  transition: all 5s;

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
      rgb(31, 13, 13) var(--center),
      rgb(39, 26, 26) var(--center),
      var(--apex-color)
    );
  opacity: 1;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.5) 0 0 15px;
}
</style>
