<template>
  <div class="kianChart">
    <div class="kianTextLayer">
      <div class="entry">1.</div>
      <div class="entry">2.</div>
      <div class="entry">3.</div>
      <div class="entry">4.</div>
      <div class="entry">5.</div>
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

  font-weight: 600;
  font-size: 3em;

  z-index: 1;
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
