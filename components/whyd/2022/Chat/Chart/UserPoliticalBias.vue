<template>
  <div ref="usbotGraph" class="usbotGraph">
    <div
      class="graphContent"
      title="Your political leaning, according to the content of your messages when processed thru INSERT ALGORITHM NAME HERE"
    >
      <h4 class="text-center mt-2">
        {{
          percentageFromLeft === 50
            ? 'the middle is rare'
            : percentageFromLeft > 50
            ? 'you are this year, liberal.'
            : "conservatively that you'd agree"
        }}
      </h4>
      <div class="politicalSlider">
        <div class="leftLine"></div>
        <div class="dotContainer">
          <div class="centerDot"></div>
        </div>
        <div class="rightLine"></div>
      </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentageFromLeft: 50
    }
  },
  watch: {
    percentageFromLeft(val) {
      this.$refs.usbotGraph.style.setProperty('--leftWidth', `${val}%`)
    }
  },
  mounted() {
    setTimeout(() => {
      this.percentageFromLeft = 40
    })
  }
}
</script>

<style scoped>
.usbotGraph {
  --leftWidth: 50%;
  --political-color-1: hsl(190, 30%, 56%);
  --political-color-2: hsl(0, 30%, 56%);
  --transition: width 1s ease;
}

.graphContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
}

.politicalSlider {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 10px;
  flex-shrink: 0;
  margin: 10px 10px;
}

.politicalSlider .leftLine {
  width: var(--leftWidth);
  transition: var(--transition);

  height: 100%;
  background-color: var(--political-color-1);
}

.politicalSlider .dotContainer {
  position: relative;
  width: 0;
  height: 100%;
}

.politicalSlider .centerDot {
  --height: 25px;
  --width: 15px;

  position: absolute;
  width: var(--width);
  height: var(--height);

  top: calc(var(--height) / -4 - 1px);
  left: calc(var(--width) / -2);

  /* background: rgba(205, 205, 205, 1); */
  background: linear-gradient(
    to right,
    var(--political-color-2) 0 25%,
    var(--political-color-1) 75%
  );
  /* border-radius: 50%; */
  border-radius: 5px;
  z-index: 1;
}

.politicalSlider .rightLine {
  width: calc(100% - var(--leftWidth));
  transition: var(--transition);

  height: 100%;
  background-color: var(--political-color-2);
}

.usbotGraphLines {
  min-height: 20%;
  width: 100%;
  display: flex;
  padding: 0 10px;
  flex-grow: 1;
}

.lineGroup1,
.lineGroup2 {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.lineGroup1 {
  width: var(--leftWidth);
  transition: var(--transition);

  --political-color: var(--political-color-1);
}

.lineGroup2 {
  width: calc(100% - var(--leftWidth));
  transition: var(--transition);

  flex-shrink: 1;
  padding-left: 5px;
  --political-color: var(--political-color-2);
}

.usbotLine {
  height: 2px;
  display: block;
  background-color: var(--political-color);
}

.line1 {
  opacity: 0.7;
  width: 90%;
}

.line2 {
  opacity: 0.55;
  width: 50%;
}

.line3 {
  opacity: 0.35;
  width: 25%;
}

.line4 {
  opacity: 0.22;
  width: 12%;
}

.line5 {
  opacity: 0.17;
  width: 7%;
}

.line6 {
  opacity: 0.135;
  width: 3.5%;
}

.line7 {
  opacity: 0.12;
  width: 2%;
}

.line8 {
  opacity: 0.11;
  width: 1%;
}
</style>
