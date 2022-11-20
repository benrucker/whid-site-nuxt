<template>
  <div class="usbotGraph">
    <div class="graphContent">
      <h1 class="text-center">u r libral</h1>
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

<script></script>

<style scoped>
.usbotGraph {
  --leftWidth: 60%;
  --political-color-1: #54b354;
  --political-color-2: #8149e9;
}

.graphContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
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
  /* padding: 10px 5px; */
}

.politicalSlider .leftLine {
  width: var(--leftWidth);
  min-width: var(--leftWidth);
  height: 100%;
  background-color: var(--political-color-1);
}

.politicalSlider .dotContainer {
  position: relative;
  width: 0;
  height: 100%;
}

.politicalSlider .centerDot {
  position: absolute;
  top: -5px;
  left: -10px;
  width: 20px;
  height: 20px;
  background-color: #838383;
  border: 1px solid #aaa;
  border-radius: 5px;
  z-index: 1;
}

.politicalSlider .rightLine {
  width: calc(100% - var(--leftWidth));
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
  --leftWidth: 60%;
  width: var(--leftWidth);
  min-width: var(--leftWidth);
  --political-color: var(--political-color-1);
}

.lineGroup2 {
  width: 50%;
  flex-shrink: 1;
  padding-left: 5px;
  --political-color: var(--political-color-2);
}

.usbotLine {
  height: 2px;
  display: block;
  /* margin-top: 20px; */
  background-color: var(--political-color);
}

.line1 {
  width: 90%;
  opacity: 70%;
}

.line2 {
  opacity: 55%;
  width: 50%;
}

.line3 {
  opacity: 35%;
  width: 25%;
}

.line4 {
  opacity: 22%;
  width: 12%;
}

.line5 {
  opacity: 17%;
  width: 7%;
}

.line6 {
  opacity: 13.5%;
  width: 3.5%;
}

.line7 {
  opacity: 12%;
  width: 2%;
}

.line8 {
  opacity: 11%;
  width: 1%;
}
</style>
