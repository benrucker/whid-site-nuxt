<template>
  <div class="broken-reactions-root">
    <div class="gitching1">
      <Whyd2022ChatChartMostUsedReactionsFixed
        :stats="stats"
        class="gitching2"
      />
    </div>
    <div class="overlay">hi hi hi hi hi hi hi</div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => ({})
    }
  }
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
  animation: random-move 20s infinite step-start;
}

.gitching2 {
  animation: random-move 6s infinite step-start;
}

.gitching2::v-deep img {
  animation: random-move 3s infinite step-start;
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
  animation-delay: 1.3s;
  animation: random-move 20s infinite step-start;
}

.gitching2::v-deep .downvote::after {
  top: 55px;
  left: 240px;
  width: 25%;
  height: 50%;
  animation-delay: 0.5s;
  animation: random-move 13s infinite step-start;

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
</style>
