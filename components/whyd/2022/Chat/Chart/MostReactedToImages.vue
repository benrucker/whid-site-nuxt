<template>
  <div>
    <Whyd2022ChatChartMostReactedToImagesBroken v-if="broken" :stats="stats" />
    <Whyd2022ChatChartMostReactedToImagesFixed v-else :stats="stats" />
    <div v-if="fixing" class="hand fly-in">
      <img src="/whyd/2022/hand1.png" />
    </div>
    <div v-if="fixed" class="hand bounce">
      <img src="/whyd/2022/hand1.png" />
    </div>
    <div v-if="fixed" class="explosion">
      <img src="/whyd/2022/explosion-fast.gif" />
    </div>
    <img
      v-if="!fixing && !fixed"
      style="display: none"
      src="/whyd/2022/explosion-fast.gif"
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
      broken: true,
      fixing: false,
      fixed: false
    }
  },
  methods: {
    fix() {
      setTimeout(() => {
        this.$el.scrollIntoView({ behavior: 'smooth', block: 'center' })

        setTimeout(() => {
          // play slappy hand animation
          this.fixing = true
          setTimeout(() => {
            this.fixing = false
            this.fixed = true
          }, 1000)

          // play explosion gif

          setTimeout(() => {
            this.broken = false
          }, 1000)
        }, 500)
      }, 2000)
    }
  }
}
</script>

<style scoped>
.hand {
  position: absolute;
  top: 40%;
  left: 0;
  transform: translate(0, 0);
  transform-origin: right center;
  width: 100px;
  height: 100px;
}

.hand img {
  width: 100%;
  height: 100%;
}

.hand.fly-in {
  animation: hand-fly-in 1s forwards cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.hand.bounce {
  animation: hand-bounce 1s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 1;
}

.explosion {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fade-out-explosion 1s forwards step-end;
}

.explosion img {
  width: 100%;
  height: 100%;
}

@keyframes hand-fly-in {
  0% {
    transform: translate(-50vw, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes hand-bounce {
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  25% {
    rotate: 5deg;
    opacity: 0.75;
  }
  50% {
    rotate: -5deg;
  }
  75% {
    rotate: 5deg;
  }
  100% {
    rotate: -5deg;
    transform: translate(-40px, -10px);
    opacity: 0;
  }
}

@keyframes fade-out-explosion {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
