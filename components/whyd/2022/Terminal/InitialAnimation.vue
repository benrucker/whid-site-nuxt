<template>
  <div id="terminal-initial-animation-root">
    <div id="terminal-white-background"></div>
  </div>
</template>

<style scoped>
#terminal-initial-animation-root {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));

  pointer-events: none;
}

#terminal-white-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: white;
  animation: glitch-out 1.75s both step-end;

  /* clip-path: polygon(0 40%, 5% 40%, 5% 80%, 0 80%); */
}

@keyframes glitch-out {
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  40% {
    clip-path: polygon(
      0 0,
      100% 0,
      100% 20%,
      60% 20%,
      60% 40%,
      100% 40%,
      100% 60%,
      30% 60%,
      30% 70%,
      100% 70%,
      100% 100%,
      0 100%
    );
  }
  48% {
    clip-path: polygon(
      0 0,
      100% 0,
      100% 20%,
      90% 20%,
      90% 40%,
      100% 40%,
      100% 60%,
      80% 60%,
      80% 70%,
      100% 70%,
      100% 80%,
      85% 80%,
      85% 90%,
      100% 90%,
      100% 100%,
      0 100%
    );
  }
  60% {
    clip-path: polygon(0 0, 100% 0, 100% 80%, 0 80%);
  }
  62% {
    clip-path: polygon(0 0, 100% 0, 100% 20%, 0 20%);
  }
  70% {
    clip-path: polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 100%);
  }
  76% {
    clip-path: polygon(
      0 0,
      100% 0,
      100% 20%,
      90% 20%,
      90% 40%,
      100% 40%,
      100% 60%,
      50% 60%,
      50% 70%,
      100% 70%,
      100% 80%,
      25% 80%,
      25% 90%,
      100% 90%,
      100% 100%,
      0 100%
    );
  }
  81% {
    clip-path: polygon(
      0 0,
      100% 0,
      100% 31%,
      80% 31%,
      80% 41%,
      100% 41%,
      100% 65%,
      53% 65%,
      53% 75%,
      100% 75%,
      100% 85%,
      30% 85%,
      30% 95%,
      100% 95%,
      100% 100%,
      0 100%
    );
  }
  85% {
    clip-path: polygon(
      0 20%,
      80% 20%,
      80% 35%,
      0 35%,
      0 65%,
      20% 65%,
      20% 80%,
      0 80%
    );
  }
  89% {
    clip-path: polygon(
      0 21%,
      81% 21%,
      81% 36%,
      0 36%,
      0 66%,
      19% 66%,
      19% 86%,
      0 86%
    );
  }
  95% {
    clip-path: polygon(0 30%, 10% 30%, 10% 55%, 0 55%);
  }
  98% {
    clip-path: polygon(0 40%, 5% 40%, 5% 80%, 0 80%);
  }
  100% {
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
}
</style>
