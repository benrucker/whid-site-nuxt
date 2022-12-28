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
            v-for="apexer of others"
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
// TODO does the number interpolation take the right amount of time?
// TODO do any users overlap the side with fewer pings?
// TODO define a max distance for the roel with more pings to move
// TODO define the lower-bound for the role with fewer pings
//        (base it subjectively off the lowest possible value that will pass in here)
// TODO edit background colors

export default {
  props: {
    stats: {
      type: Object,
      required: true,
    },
    leagueCount: {
      type: Number,
      required: true,
    },
    otherCount: {
      type: Number,
      required: true,
    },
    otherName: {
      type: String,
      required: true,
    },
    leaguers: {
      type: Array,
      required: true,
    },
    others: {
      type: Array,
      required: true,
    },
    minValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
    otherColor: {
      type: String,
      required: true,
    },
    otherCenterColor: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      transformMultiplier: 2,
      rootRef: null,
      perspectiveRef: null,
      intermediateLeagueCount: 0,
      intermediateOtherCount: 0,
      numberUpper: 0,
      minCount: 0,
      maxCount: 0,
    }
  },
  mounted() {
    this.$refs.root.style =
      '--other-color: ' +
      this.otherColor +
      '; ' +
      '--other-center-color: ' +
      this.otherCenterColor +
      ';'

    setTimeout(() => {
      this.moveElementsIntoPlace()
      // this.moveCenterLine(leagueCount, otherCount)
      setTimeout(() => {
        this.avatarWiggler = setInterval(this.wiggleAvatars, 4000)
      }, 100)
      this.numberUpper = setInterval(this.numberUp, 16)
    }, 1000) // TODO bring this back to 2000

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
      this.minCount = Math.min(
        ...this.leaguers.map((leaguer) => leaguer.pings),
        ...this.others.map((other) => other.pings),
      )
      this.maxCount = Math.max(
        ...this.leaguers.map((leaguer) => leaguer.pings),
        ...this.others.map((other) => other.pings),
      )

      let larger, smaller, proportion, xDistanceSmaller, xDistanceLarger
      if (this.leagueCount > this.otherCount) {
        larger = this.$refs.left.children
        smaller = this.$refs.right.children

        proportion =
          (this.otherCount - this.minValue) / (this.leagueCount - this.minValue)
        xDistanceSmaller = -25 * proportion
        xDistanceLarger = 25
      } else {
        larger = this.$refs.right.children
        smaller = this.$refs.left.children

        proportion =
          (this.leagueCount - this.minValue) / (this.otherCount - this.minValue)
        xDistanceSmaller = 10
        xDistanceLarger = -25
      }

      const maxZDist = 160
      const minZDist = 80

      const zDistance = (maxZDist - minZDist) * proportion + minZDist

      this.transformGraphElements(
        `translate3d(${xDistanceLarger}px, 0, ${maxZDist}px)`,
        larger,
      )
      this.transformGraphElements(
        `translate3d(${xDistanceSmaller}px, 0, ${zDistance}px)`,
        smaller,
      )
    },
    transformGraphElements(translate, children) {
      let avatars = []
      for (const child of children) {
        if (child.tagName !== 'DIV') {
          child.style.setProperty('transform', translate)
        } else {
          // child is an avatar
          avatars.push(child)
        }
      }

      setTimeout(() => {
        avatars = avatars.sort((avatar, other) => {
          const thisPings =
            this.leaguers.find((leaguer) => leaguer.name === avatar.id) ||
            this.others.find((apexer) => apexer.name === avatar.id)
          const otherPings =
            this.leaguers.find((leaguer) => leaguer.name === other.id) ||
            this.others.find((apexer) => apexer.name === other.id)
          return thisPings.pings - otherPings.pings
        })

        let i = 0
        for (const avatar of avatars) {
          const data =
            this.leaguers.find((leaguer) => leaguer.name === avatar.id) ||
            this.others.find((apexer) => apexer.name === avatar.id)
          const scale = data.pings
          const proportionalScale = (scale + 1 - this.minCount) / this.maxCount

          // choose an X and Y position for the avatar
          // in a ring around (0, 0), closer to the center the larger the scale
          const angle = i++ % (2 * Math.PI)
          const radius = 35 * Math.log(proportionalScale) ?? 1 + 3
          const x = (radius / 2) * Math.cos(angle)
          const y = radius * Math.sin(angle)

          avatar.style.setProperty(
            'transform',
            `translate3d(${x}px, ${y}px, ${60 * proportionalScale}px) scale(${
              1 + proportionalScale
            })`,
            'important',
          )
          avatar.style.setProperty('opacity', `1`)
        }
      }, 1000)
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
            `translate3d(${randX}px, ${randY}px, ${randZ}px)`,
          )
        }, delay)
      })
    },
    moveCenterLine(leagueCount, otherCount) {
      const backgroundElement = this.$refs.canvas
      const percentage = Math.floor(
        (leagueCount / (leagueCount + otherCount)) * 100,
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
    },
  },
}
</script>

<style scoped>
#graph-root {
  position: relative;
  height: 300px;
  width: 400px;
  /* margin: -4px; */

  --league-color: #18191c;
  --other-color: #d64d44;

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
  /* box-shadow: rgba(0, 0, 0, 0.5) 1.5px 2.5px 10px; */

  z-index: 2;

  white-space: pre;
  text-align: center;
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
      rgba(224, 254, 255, 0.07) 0%,
      rgba(27, 13, 2, 0.8) 150%
    ),
    linear-gradient(
      to right,
      var(--league-color),
      rgb(52, 52, 54) var(--center),
      var(--other-center-color) var(--center),
      var(--other-color)
    );
  opacity: 1;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.5) 0 0 15px;
}
</style>
