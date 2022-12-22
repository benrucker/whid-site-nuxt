<template>
  <div class="usbotGraph">
    <div class="graphContent">
      <h4>you got the lack of response</h4>
      <div class="number">
        <span class="value">{{ noResponseCount }}</span>
        <div class="usbotGraphLines">
          <div class="lineGroup1">
            <div class="usbotLine line1"></div>
            <div class="usbotLine line2"></div>
            <div class="usbotLine line3"></div>
            <div class="usbotLine line4"></div>
            <div class="usbotLine line5"></div>
            <div class="usbotLine line6"></div>
            <div class="usbotLine line7"></div>
            <div class="usbotLine line8"></div>
          </div>
          <div class="lineGroup2">
            <div class="usbotLine line1"></div>
            <div class="usbotLine line2"></div>
            <div class="usbotLine line3"></div>
            <div class="usbotLine line4"></div>
            <div class="usbotLine line5"></div>
            <div class="usbotLine line6"></div>
            <div class="usbotLine line7"></div>
            <div class="usbotLine line8"></div>
          </div>
        </div>
      </div>

      <h4 class="text-end">times!</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    noResponseCount() {
      return this.stats.user.noResponseCount ?? 546
    }
  }
}
</script>

<style scoped>
.usbotGraph {
  --bubble-color-2: hsl(190, 30%, 56%);
  padding: 0 0;
}

.graphContent {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
}

h4 {
  padding: 0 10px;
}

.number {
  text-align: center;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
  flex-grow: 1;
  margin: 10px 0;
}

.number .value {
  display: inline-block;
  margin-top: 15px;
  font-size: 3rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0);
  padding: 0 60px 0 60px; /* this padding resizes the backgroup ellipse */
  background: radial-gradient(
    ellipse at bottom,
    var(--bubble-color-2) 0 35%,
    var(--bubble-color) 35% 100%
  );
  overflow: clip;
  background-clip: text;
  background-size: 100% 100%;
  background-position: 0;
  text-decoration: none;
}

.usbotGraphLines {
  position: absolute;
  top: 25%;
  left: 0;

  min-height: 100%;
  width: 100%;
  display: flex;
  padding: 0 0;
  flex-grow: 2;
}

.lineGroup1,
.lineGroup2 {
  min-height: 50%;
  width: 50%;

  flex-grow: 2;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.usbotLine {
  min-height: 5px;
  height: calc(var(--size) * 2.5);
  display: block;
  /* margin-top: 20px; */
  /* background-color: #ddd; */
  overflow: visible;
  background: radial-gradient(
      circle at 0% 50%,
      var(--bubble-color) 0,
      var(--bubble-color) var(--size),
      rgba(255, 255, 255, 0) calc(var(--size) + 1px)
    ),
    radial-gradient(
      circle at 100% 50%,
      var(--bubble-color-2) 0,
      var(--bubble-color-2) var(--size),
      rgba(255, 255, 255, 0) calc(var(--size) + 1px)
    );
}

.lineGroup2 .usbotLine {
  transform: scaleX(-1);
}

.line1 {
  --size: 7px;
  opacity: 1;
  width: 100%;
  background: radial-gradient(
    circle at 0% 50%,
    var(--bubble-color) 0,
    var(--bubble-color) var(--size),
    rgba(255, 255, 255, 0) calc(var(--size) + 1px)
  );
}

.line2 {
  --size: 7px;
  opacity: 0.75;
  width: 55%;
}

.line3 {
  --size: 7px;
  opacity: 0.5;
  width: 25%;
}

.line4 {
  --size: 7px;
  opacity: 0.3;
  width: 12%;
}

.line5 {
  --size: 7px;
  opacity: 0.19;
  width: 7%;
}

.line6 {
  --size: 7px;
  opacity: 0.12;
  width: 3.5%;
}

.line7 {
  --size: 7px;
  opacity: 0.09;
  width: 2%;
}

.line8 {
  --size: 7px;
  opacity: 0.06;
  width: 1%;
}
</style>
