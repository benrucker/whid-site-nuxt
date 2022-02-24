<template>
  <canvas id="header_canvas"> </canvas>
</template>

<script>
export default {
  head: {
    script: [
      {
        type: "text/javascript",
        src: "https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js",
      },
    ],
  },
  async mounted() {
    setTimeout(() => {
      var confettiCanvas = document.getElementById("header_canvas");
      var confettiCount = 200;
      var confettiDefaults = {
        origin: { y: 0.5 },
      };

      // you should  only initialize a canvas once, so save this function
      // we'll save it to the canvas itself for the purpose of this demo
      confettiCanvas.confetti =
        confettiCanvas.confetti ||
        confetti.create(confettiCanvas, { resize: true });

      function fire(particleRatio, opts) {
        confettiCanvas.confetti(
          Object.assign({}, confettiDefaults, opts, {
            particleCount: Math.floor(confettiCount * particleRatio),
          })
        );
      }

      setTimeout(() => {
        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });
        fire(0.2, {
          spread: 60,
        });
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });
      }, 1000);
    }, 1000);
  },
};
</script>

<style scoped>
canvas {
  position: absolute;
  width: inherit;
  z-index: 1;
  height: inherit;
}
</style>