<template>
  <div class="root mb-4">
    <div class="fun-logos">
      <img src="/whyd/2022/header-images/bell.svg" />
      <img src="/whyd/2022/header-images/jazz.svg" />
      <img src="/whyd/2022/header-images/mtv.svg" />
      <img src="/whyd/2022/header-images/seinfeld.svg" />
      <img src="/whyd/2022/header-images/snes.svg" />
      <img src="/whyd/2022/header-images/toysrus.svg" />
    </div>
    <div class="image">
      <img
        ref="logo"
        class="visible"
        src="/whyd/2022/header-images/logo-point.png"
      />
    </div>
    <div class="secbot-image">
      <img ref="secbotLogo" src="/whyd/2022/header-images/secuitybot.png" />
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      otherLogos: [],
      regularLogo: undefined,
      flickerDuration: 300,
      flickerDurationMax: 700,
      flickerDurationMin: 300,
      flickerCooldown: 2000,
      flickerCooldownMax: 5000,
      flickerCooldownMin: 1000,
      transitionDuration: 200,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.otherLogos = document.querySelectorAll('.fun-logos img')
      this.regularLogo = this.$refs.logo
      this.secbotLogo = this.$refs.secbotLogo

      this.queueGlitch()
    })
  },
  methods: {
    glitch() {
      const logo = this.getRandomLogo()
      this.regularLogo.classList.remove('visible')

      console.log(this.transitionDuration, this.flickerDuration)

      setTimeout(() => {
        logo.classList.add('visible')
        this.secbotLogo.classList.add('visible')
        setTimeout(() => {
          this.secbotLogo.classList.remove('visible')
        }, this.transitionDuration)
      }, this.transitionDuration)

      setTimeout(() => {
        logo.classList.remove('visible')
        this.regularLogo.classList.add('visible')
      }, this.transitionDuration + this.flickerDuration)

      this.queueGlitch()
    },
    getRandomLogo() {
      return this.otherLogos[Math.floor(Math.random() * this.otherLogos.length)]
    },
    queueGlitch() {
      this.flickerCooldown =
        Math.random() * (this.flickerCooldownMax - this.flickerCooldownMin) +
        this.flickerCooldownMin

      this.flickerDuration =
        Math.random() * (this.flickerDurationMax - this.flickerDurationMin) +
        this.flickerDurationMin

      setTimeout(this.glitch, this.flickerCooldown)
    },
  },
}
</script>

<style scoped lang="scss">
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.image {
  position: absolute;
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.secbot-image {
  position: absolute;
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

div.fun-logos {
  position: absolute;
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  --transition-duration: 0.2s;
  position: absolute;
  height: 200px;
  max-width: 350px;
  opacity: 0;

  transition: opacity var(--transition-duration) step-end;
  animation: glitch var(--transition-duration) step-start;
  transform: translate(0, 0) skewX(0);
  filter: blur(0) grayscale(0);

  &.visible {
    opacity: 1;
    animation: none;
  }
}

.secbot-image > img {
  transition: none; /* overrides general img transition rule */
  animation: secbot-glitchiness var(--transition-duration) step-end infinite !important;
}

@keyframes glitch {
  0% {
    transform: scaleX(1) translate(1px, -5px) skewX(9deg);
    filter: blur(10px) grayscale(1);
  }
  10% {
    transform: scaleX(1) translate(5px, 4px) skewX(9deg);
    filter: blur(5px) grayscale(1);
  }
  12% {
    transform: scaleX(1) translate(3px, 3px) skewX(9deg);
    filter: blur(2px) grayscale(1);
  }
  20% {
    transform: scaleX(2) translate(-5px, -9px) skewX(9deg);
    filter: blur(10px) grayscale(1);
  }
  40% {
    transform: scaleX(1) translate(-1px, 2px) skewX(15deg);
    filter: blur(2px) grayscale(1);
  }
  45% {
    transform: scaleX(1) translate(1px, -1px) skewX(-35deg);
    filter: blur(5px) grayscale(1);
  }
  49% {
    transform: scaleX(1) translate(2px, 0px) skewX(9deg);
    filter: blur(5px) grayscale(0);
  }
  80% {
    transform: scaleX(1) translate(10px, 10px) skewX(9deg);
    filter: blur(1px) grayscale(0);
  }
  85% {
    transform: scaleX(1) translate(8px, 8px) skewX(9deg);
    filter: blur(1px) grayscale(0);
  }
  100% {
    transform: scaleX(1) translate(-30px, 0px) skewX(0);
    filter: blur(0) grayscale(0);
  }
}

@keyframes secbot-glitchiness {
  0% {
    transform: scaleX(1) translate(1px, -5px) skewX(35deg);
    filter: blur(20px) grayscale(1);
  }
  10% {
    transform: scaleX(1) translate(5px, 4px) skewX(9deg);
    filter: blur(5px) grayscale(1);
  }
  12% {
    transform: scaleX(1) translate(3px, 3px) skewX(-9deg);
    filter: blur(2px) grayscale(1);
  }
  20% {
    transform: scaleX(2) translate(-5px, -9px) skewX(9deg);
    filter: blur(10px) grayscale(1);
  }
  40% {
    transform: scaleX(1) translate(-1px, 2px) skewX(-15deg);
    filter: blur(2px) grayscale(1);
  }
  45% {
    transform: scaleX(1) translate(1px, -1px) skewX(0deg);
    filter: blur(0) grayscale(0.1);
  }
  49% {
    transform: scaleX(1) translate(2px, 0px) skewX(9deg);
    filter: blur(5px) grayscale(0);
  }
  80% {
    transform: scaleX(1) translate(10px, 10px) skewX(9deg);
    filter: blur(1px) grayscale(0);
  }
  85% {
    transform: scaleX(1) translate(8px, 8px) skewX(9deg);
    filter: blur(1px) grayscale(0);
  }
  100% {
    transform: scaleX(1) translate(-30px, 0px) skewX(0);
    filter: blur(0) grayscale(0);
  }
}
</style>
