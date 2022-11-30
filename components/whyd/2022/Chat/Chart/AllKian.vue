<template>
  <div class="kianChart" @click.stop="">
    <svg
      class="noise"
      viewBox="0 100 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>

      <rect filter="url(#noiseFilter)" />
    </svg>
    <div class="overlay"></div>
    <div class="notSvg">
      <div class="kianTextLayer">
        <div class="entry">
          <div class="number">1.</div>
          <div class="spacer" />
          <div class="name">SilentKON</div>
        </div>
        <div class="entry">
          <div class="number">2.</div>
          <div class="spacer" />
          <div class="name">Cameron</div>
        </div>
        <div class="entry">
          <div class="number">3.</div>
          <div class="spacer" />
          <div class="name">Kian</div>
        </div>
        <div class="entry">
          <div class="number">4.</div>
          <div class="spacer" />
          <div class="name">Mr. Souayvixay</div>
        </div>
        <div class="entry">
          <div class="number">5.</div>
          <div class="spacer" />
          <div class="name">The Gilded God</div>
        </div>
      </div>
    </div>
    <Whyd2022ChatChart3DKian class="chart3d" />
  </div>
</template>

<script></script>

<style scoped>
.kianChart {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 1) 100%
  );

  width: 400px;
  height: 500px;

  border-radius: 20px;

  position: relative;

  font-family: Brush Script MT;

  border: inset 5px;

  animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}

rect {
  width: 100%;
  height: 1000px;
  top: -10px;
  border-radius: 20px;
}

.notSvg {
  border-radius: 15px;
  height: 100%;
}

svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  border-radius: 15px;
  filter: contrast(170%) brightness(100%);
  background: linear-gradient(45deg, rgb(112, 23, 129), rgba(0, 0, 0, 0));
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  border-radius: 15px;
  background: moccasin;
  mix-blend-mode: multiply;
}

.kianTextLayer {
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  height: 100%;
  width: 100%;
}

.entry {
  display: flex;
  flex-shrink: 1;
  align-items: center;
  justify-content: flex-start;
  z-index: 1;
  color: #151515;
  text-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);
  user-select: none;
  pointer-events: none;
}

.entry .spacer {
  width: 120px;
}

.entry .number {
  width: 40px;
  font-weight: 600;
  font-size: 3em;
}

.entry .name {
  font-weight: 600;
  font-size: 1.5em;
}

.entry img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
}

.chart3d {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
