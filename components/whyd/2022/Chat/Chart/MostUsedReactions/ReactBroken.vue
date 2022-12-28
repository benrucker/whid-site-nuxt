<template>
  <div class="broken-reactions-root">
    <div class="blurring duplicate clip-stutter">
      <Whyd2022ChatChartMostUsedReactionsReactFixed
        :stats="stats"
        img-url="/whyd/2022/data/emojis/cheeto.png"
      />
    </div>
    <div class="blurring duplicate clip-glitch">
      <Whyd2022ChatChartMostUsedReactionsReactFixed
        :stats="stats"
        img-url="hi"
      />
    </div>
    <div class="gitching1">
      <div class="blurring">
        <Whyd2022ChatChartMostUsedReactionsReactFixed
          :stats="stats"
          class="gitching2"
          img-url="/whyd/2022/missing_texture_small.png"
        />
      </div>
    </div>
    <div class="overlay">cheeto cheeto cheeto cheeto cheeto</div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style scoped>
.broken-reactions-root {
}

.overlay {
  position: absolute;
  top: 0;
  left: 35px; /* should be equal to the padding-left of the fixed component */
  right: 0;
  bottom: 0;
  /* background: rgba(0, 0, 0, 0.5); */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.gitching1 {
  animation: random-move 100s infinite step-start;
}
.blurring {
  filter: blur(0) contrast(1);
  animation: stutter 10s infinite cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.duplicate {
  position: absolute;
  top: 5px;
  left: 5px;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.gitching2 {
  animation: random-move 50s infinite step-start;
}

.clip-glitch {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  animation-delay: 0.3s;
  animation: clip-glitch 6s infinite cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0.5;
}

.clip-stutter {
  transform: translate(0, 0);
  clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
  animation: clip-stutter 10s infinite step-start;
  z-index: 1;
}

.gitching2::v-deep img {
  animation: random-move 15s infinite step-start;
  position: relative;
  /* clip-path: polygon(15% 10%, 50% 0, 59% 50%, 35% 100%); */
}

.gitching2::v-deep .upvote::after,
.gitching2::v-deep .downvote::after {
  background-image: url('https://developer.valvesoftware.com/w/images/5/5b/Missing_textures_example.png');
  background-repeat: repeat;
  content: '';
  position: absolute;
  top: 70px;
  left: 50px;
  width: 30%;
  height: 40%;
  /* animation-delay: 1.3s; */
  animation: random-move 20s infinite step-start;
}

.gitching2::v-deep .downvote::after {
  top: 55px;
  left: 240px;
  width: 25%;
  height: 50%;
  /* animation-delay: 0.5s; */
  animation: random-move 10s infinite step-start;

  clip-path: polygon(0 0, 50% 0, 50% 30%, 100% 30%, 100% 100%, 0 100%);
}

@keyframes random-move {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(10px, 5px);
  }
  20% {
    transform: translate(8px, 0px);
  }
  30% {
    transform: translate(3px, 2px);
  }
  40% {
    transform: translate(-1px, 3px);
  }
  50% {
    transform: translate(6px, 0px);
  }
  60% {
    transform: translate(-10px, -2px);
  }
  70% {
    transform: translate(7px, 1px);
  }
  80% {
    transform: translate(0px, 10px);
  }
  90% {
    transform: translate(2px, 2px);
  }
  100% {
    transform: translate(-5px, 0px);
  }
}

@keyframes stutter {
  0% {
    filter: blur(0px) contrast(1);
  }
  45% {
    filter: blur(0px) contrast(1);
  }
  46% {
    filter: blur(1px) contrast(1);
  }
  47% {
    filter: blur(0px) contrast(1);
  }
  50% {
    filter: blur(3px) contrast(200%);
  }
  51% {
    filter: blur(0px) contrast(1);
  }
  66% {
    filter: blur(0px) contrast(1);
  }
  70% {
    filter: blur(1px) contrast(1);
  }
  72% {
    filter: blur(0px) contrast(1);
  }
  73% {
    filter: blur(7px) contrast(200%);
  }
  74% {
    filter: blur(0px) contrast(50%) grayscale(0%);
  }
  80% {
    filter: blur(1px) contrast(1) grayscale(80%);
  }
  86% {
    filter: blur(0px) contrast(1) grayscale(0%);
  }
  100% {
    filter: blur(0px) contrast(1);
  }
}

@keyframes clip-glitch {
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  10% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  11% {
    clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
  }
}

@keyframes clip-stutter {
  0% {
    clip-path: polygon(0 20%, 100% 20%, 100% 50%, 0 50%);
    transform: translate(0, 0);
  }
  10% {
    clip-path: polygon(0 20%, 100% 20%, 100% 50%, 0 50%);
    transform: translate(0, 0);
  }
  11% {
    clip-path: polygon(0 20%, 100% 20%, 100% 50%, 0 50%);
    transform: translate(10px, 5px);
  }
  14% {
    clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
    transform: translate(15px, 5px);
  }
  18% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  50% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  51% {
    clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%);
    transform: translate(0, 0);
  }
  54% {
    clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%);
    transform: translate(10px, 5px);
  }
  59% {
    clip-path: polygon(0 75%, 100% 60%, 100% 85%, 0 85%);
    transform: translate(15px, 5px);
  }
  62% {
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
}
</style>
