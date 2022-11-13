<template>
  <div class="kianChart">
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
  color: #222;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
