<template>
  <div ref="bubble" :class="`bubble`">
    <transition :key="msgId" name="tail-exit">
      <div v-if="isLastInGroup" class="tail-parent">
        <div class="tail" />
      </div>
    </transition>
    <div class="background" />
  </div>
</template>

<script>
export default {
  props: {
    msgId: {
      type: Number,
      required: true
    },
    color: {
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

.message .content .bubble .background {
  position: absolute;
  width: 100%;
  height: 100%;
  content: '';
}

.message.right .content .bubble .background {
  right: 0;

  transform-origin: bottom right;
}

.message.left .content .bubble .background {
  transform-origin: bottom left;
}

.message .content .bubble .tail-parent {
  position: absolute;
  width: 15px;
  height: 15px;
  top: calc(100% - 1px);

  content: '';
  transform: translate(0, 0px);

  overflow: hidden;
  border-radius: 0.01px;
}

.message.left .content .bubble .tail-parent {
  left: 0;
}

.message.right .content .bubble .tail-parent {
  right: 0;
}

.message .content .bubble .tail {
  width: 100%;
  height: 100%;
  transform: rotate(0);
  background-color: var(--bubble-color);
}

.message.left .content .bubble .tail {
  clip-path: polygon(0 0, 100% 0, 0 75%);
}

.message.right .content .bubble .tail {
  clip-path: polygon(0 0, 100% 0, 100% 75%);
}

.tail-exit-leave-active {
  animation: slide-up 0.5s;
}

.message.left .content .bubble .background {
  background-color: var(--bubble-color);

  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 1em;
}

.message.right .content .bubble .background {
  background-color: var(--bubble-color);

  border-bottom-right-radius: 0;
  border-bottom-left-radius: 1em;
  border-top-right-radius: 1em;
  border-top-left-radius: 0;
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
</style>
