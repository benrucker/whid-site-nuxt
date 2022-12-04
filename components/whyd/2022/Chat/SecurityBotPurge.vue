<template>
  <div class="end-anim-component">
    <div class="secbot-root">
      <div class="secbot-text">
        DISGRACE TOLERANCE EXCEEDED! PURGING INSOLENCE!
      </div>
      <div class="secbot-text secbot-copy">
        DISGRACE TOLERANCE EXCEEDED! PURGING INSOLENCE!
      </div>
    </div>
    <div id="end-anim-overlay" ref="overlayStuff" class="secbot-end-anim">
      <div class="white-fade"></div>
      <div class="random-move">
        <div class="shuffle-z">
          <img
            class="missing-large"
            src="/whyd/2022/missing_texture_large.png"
          />
        </div>
        <img
          class="missing-large delay1 duration1"
          src="/whyd/2022/missing_texture_large.png"
        />
        <img
          class="missing-large delay2 duration2"
          src="/whyd/2022/missing_texture_large.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const conversation = document.getElementById('the-one-above-conversation')
    conversation.after(this.$refs.overlayStuff) // ref points to new location
    this.explode()

    const whiteFade = document.createElement('div')
    whiteFade.classList.add('white-fade')
    this.$refs.overlayStuff.after(whiteFade)
  },
  methods: {
    explode() {
      const el = document.createElement('div')
      // el.src = `/whyd/2022/explosion-fast.gif?${Math.random()}`
      el.classList.add('secbot-explosion')
      const leftOffset = Math.random() * 100
      el.style.left = `${leftOffset}%`

      const topOffset = Math.random() * 100
      el.style.top = `${topOffset}%`

      const scale = Math.random() * 2 + 1
      el.style.transform = `scale(${scale})`

      this.$refs.overlayStuff.appendChild(el)
      setTimeout(() => {
        el.remove()
      }, 1000)

      setTimeout(this.explode, Math.random() * 500)
    }
  }
}
</script>

<style>
#the-one-above-conversation.breaking {
  overflow: hidden;
}

#the-one-above-conversation.breaking .message {
  /* overflow: hidden; */
  animation: fade-out 10s ease-in-out both;
  animation-delay: 1s;
}

#conversation.breaking {
  animation: random-move 2s infinite step-start;
  position: relative;
}

.secbot-explosion {
  background: url('/whyd/2022/explosion-sheet.png');
  width: 71px;
  height: 100px;
  position: absolute;

  animation: explosion-sprite 1s steps(18) forwards;
}

.white-fade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 100;
  animation: fade-in 10s ease-in-out both;
  animation-delay: 10s;
}

@keyframes explosion-sprite {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -1278px 0;
  }
}

@keyframes random-move {
  0% {
    left: 0;
    top: 0;
  }
  10% {
    left: 10p;
    top: 5px;
  }
  20% {
    left: 8px;
    top: 0px;
  }
  30% {
    left: 3px;
    top: 2px;
  }
  40% {
    left: -1p;
    top: 3px;
  }
  50% {
    left: 6px;
    top: 0px;
  }
  60% {
    left: -10;
    top: x -2px;
  }
  70% {
    left: 7px;
    top: 1px;
  }
  80% {
    left: 0px;
    top: 10px;
  }
  90% {
    left: 2px;
    top: 2px;
  }
  100% {
    left: -5p;
    top: 0px;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

<style scoped>
.secbot-end-anim {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
}

.secbot-end-anim .random-move {
  position: absolute;
  top: 0;
  left: -10px;
  width: 100%;
  height: 100%;
  overflow: hidden;

  animation: random-move 2s infinite step-start;
}

.secbot-end-anim .missing-large {
  position: absolute;

  width: 100%;
  height: 100%;

  animation: clip-stutter 5s infinite step-end;
}

.secbot-end-anim .white-fade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: fade-to-white 15s ease-in-out both;
  opacity: 1;
}

.duration1 {
  animation-duration: 10s !important;
}

.duration2 {
  animation-duration: 4s !important;
}

.delay1 {
  animation-delay: 0.1s !important;
}

.delay2 {
  animation-delay: 1s !important;
}

.secbot-root {
  position: relative;
}

.secbot-text {
  font-weight: bold;
}

.secbot-copy {
  transform: translate(0, 0);
  position: absolute;
  top: 0;
  left: 0;
  animation: shake 0.5s infinite;
  /* text-shadow: 0 0 0.1px #000; */
}

@keyframes shake {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-1px, -1px);
  }
  20% {
    transform: translate(1px, 1px);
  }
  30% {
    transform: translate(-1px, 1px);
  }
  40% {
    transform: translate(1px, -1px);
  }
  50% {
    transform: translate(0, 0);
  }
  60% {
    transform: translate(1px, 1px);
  }
  70% {
    transform: translate(-1px, -1px);
  }
  80% {
    transform: translate(1px, -1px);
  }
  90% {
    transform: translate(-1px, 1px);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes clip-stutter {
  0% {
    clip-path: polygon(0 20%, 100% 20%, 100% 80%, 0 50%);
    transform: translate(0, 0);
  }
  10% {
    clip-path: polygon(0 20%, 100% 20%, 100% 50%, 0 50%);
    transform: translate(0, 0);
  }
  11% {
    clip-path: polygon(0 0%, 100% 20%, 100% 50%, 0 50%);
    transform: translate(10px, 5px);
  }
  14% {
    clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
    transform: translate(15px, 5px);
  }
  18% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  30% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  41% {
    clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
    transform: translate(10px, 0);
  }
  46% {
    clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
    transform: translate(10px, 150px);
  }
  49% {
    clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
    transform: translate(15px, 50px);
  }
  50% {
    clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
    transform: translate(15px, 5px);
  }
  52% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  70% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  71% {
    clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%);
    transform: translate(0, 0);
  }
  74% {
    clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 85%);
    transform: translate(10px, 5px);
  }
  79% {
    clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 85%);
    transform: translate(15px, 5px);
  }
  82% {
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
  }
  100% {
    clip-path: polygon(0 20%, 100% 0, 100% 0, 0 0);
  }
}

@keyframes fade-to-white {
  0% {
    background-color: rgba(0, 0, 0, 0);
  }
  100% {
    background-color: #fff;
  }
}
</style>
