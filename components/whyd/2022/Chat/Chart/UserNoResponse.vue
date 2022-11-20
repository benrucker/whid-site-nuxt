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
  padding: 0 10px;
}

.graphContent {
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
}

.number {
  text-align: center;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  flex-shrink: 0;
  flex-grow: 1;
  margin: 10px 10px;
  /* padding: 10px 5px; */
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
  padding: 0 10px;
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
  display: block;
  /* margin-top: 20px; */
  /* background-color: #ddd; */
  overflow: visible;
  background: radial-gradient(
      circle at 0% 50%,
      rgba(255, 255, 255, 0.5) 0,
      rgba(255, 255, 255, 0.5) 2px,
      rgba(255, 255, 255, 0) 3px
    ),
    radial-gradient(
      circle at 100% 50%,
      rgba(255, 255, 255, 0.5) 0,
      rgba(255, 255, 255, 0.5) 2px,
      rgba(255, 255, 255, 0) 3px
    );
}

.line1 {
  opacity: 70%;
  width: 100%;
}

.line2 {
  opacity: 55%;
  width: 55%;
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
