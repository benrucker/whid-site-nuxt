<template>
  <div
    :class="`${side} message typing ${isFirstInGroup ? 'first-in-group' : ''}`"
  >
    <span class="avatar-wrapper">
      <div class="avatar"></div>
    </span>
    <div class="content">
      <Whyd2022ChatBubble
        ref="bubble"
        :msg-id="9999999"
        :color="'#444'"
        :is-last-in-group="false"
      />
      <div class="typingDots">
        <div class="t1" />
        <div class="t2" />
        <div class="t3" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    side: {
      type: String,
      required: true
    },
    isFirstInGroup: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.message {
  position: relative;
  --bubble-color: rgb(49, 49, 49);
}

.message .first-in-group {
  margin-top: 30px;
}

.typing .content::after {
  animation-delay: 1s;
}

.typing .content .typingDots {
  height: 1em;
  margin-top: 0.1em;
  margin-bottom: 0.1em;

  animation-name: fade;
  animation-delay: 1s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-duration: 0.5s;

  display: flex;
  justify-content: space-around;
}

.typing .t1 {
  animation-delay: 0s;
}

.typing .t2 {
  animation-delay: 0.2s;
}

.typing .t3 {
  animation-delay: 0.4s;
}

.typing .content .t1,
.typing .content .t2,
.typing .content .t3 {
  width: 1em;
  height: 1em;
  background-color: rgb(119, 119, 119);
  margin-left: 0.1em;
  margin-right: 0.1em;

  animation-name: pulse;
  animation-duration: 2.75s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;

  opacity: 0.75;
  mix-blend-mode: lighten;

  border-radius: 50%;
  scale: 0.56;
}

@keyframes pulse {
  0%,
  100% {
    background-color: rgb(80, 80, 80);
  }

  50% {
    background-color: rgb(122, 122, 122);
  }
}
</style>

<style scoped>
.content .bubble {
  animation-delay: 1s !important;
}
</style>
