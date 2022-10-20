<template>
  <div ref="bubble" class="bubble">
    <transition :key="msgId" name="tail-exit">
      <div v-if="isLastInGroup" class="tail" />
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    msgId: {
      type: String,
      required: true
    },
    isLastInGroup: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>
.message .content .bubble {
  position: absolute;
  z-index: -1;
  bottom: 0;
  height: 100%;
  width: calc(100% + 1.5em);
}

.message.left .content .bubble {
  transform-origin: bottom left;
  left: -15px;
  animation: expand-left 0.2s ease-out 0s 1 both;
}

.message.right .content .bubble {
  transform-origin: bottom right;
  right: -15px;
  animation: expand-right 0.2s ease-out 0s 1 both;
}

.message .content .bubble::after {
  position: absolute;
  width: 100%;
  height: 100%;
  content: '';
}

.message.right .content .bubble::after {
  right: 0;

  transform-origin: bottom right;
}

.message.left .content .bubble::after {
  transform-origin: bottom left;
}

.message .content .bubble .tail {
  position: absolute;
  width: 15px;
  height: 15px;
  top: calc(100% - 1px);

  content: '';
  transform: translate(0, 0px);
}

.message.left .content .bubble .tail {
  clip-path: polygon(0 0, 100% 0, 0 75%);
  background: grey;
}

.message.right .content .bubble .tail {
  right: 0;
  clip-path: polygon(0 0, 100% 0, 100% 75%);
  background-color: rgb(37, 145, 181);
}

.tail-exit-leave-active {
  animation: slide-up 0.5s;
}

@keyframes slide-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-15px);
  }
}

@keyframes expand-left {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1) skew(-9deg);
  }
}

@keyframes expand-right {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1) skew(9deg);
  }
}

.message.left .content .bubble::after {
  background-color: gray;

  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 1em;
}

.message.right .content .bubble::after {
  background-color: rgb(37, 145, 181);

  border-bottom-right-radius: 0;
  border-bottom-left-radius: 1em;
  border-top-right-radius: 1em;
  border-top-left-radius: 0;
}
</style>
