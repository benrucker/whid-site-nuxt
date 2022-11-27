<template>
  <div class="usbotGraph">
    <div class="graphContent">
      <h4>you got no response</h4>
      <div class="number">
        <h1>546</h1>
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

      <h4 class="text-end">times</h4>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.usbotGraph {
  --leftWidth: 60%;
  padding: 0 0;
}

.graphContent {
  display: flex;
  flex-direction: column;
  justify-content: start;
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

.number h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-top: 25px;
}

.usbotGraphLines {
  position: absolute;
  top: 40%;
  left: 0;

  min-height: 80%;
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
  --bubble-color-2: hsl(190, 30%, 56%);
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
  opacity: 100%;
  width: 100%;
}

.line2 {
  --size: 7px;
  opacity: 75%;
  width: 55%;
}

.line3 {
  --size: 7px;
  opacity: 50%;
  width: 25%;
}

.line4 {
  --size: 7px;
  opacity: 30%;
  width: 12%;
}

.line5 {
  --size: 7px;
  opacity: 19%;
  width: 7%;
}

.line6 {
  --size: 7px;
  opacity: 12%;
  width: 3.5%;
}

.line7 {
  --size: 7px;
  opacity: 9%;
  width: 2%;
}

.line8 {
  --size: 7px;
  opacity: 6%;
  width: 1%;
}
</style>
