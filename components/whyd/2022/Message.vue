<template>
  <div :class="msg.side + ' message'">
    <span class="avatar-wrapper">
      <img
        v-if="isLastInGroup"
        :key="index"
        src="/whyd/2021/emojis/cheeto.png"
        class="avatar"
      />
    </span>
    <div class="content">
      <div class="bubble">
        <transition :key="msg.id" name="tail-exit">
          <div v-if="isLastInGroup" class="tail" />
        </transition>
      </div>
      <component
        :is="'Whyd2022' + (msg.type || 'Text')"
        :content="msg.content"
        :stats="stats"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    msg: {
      type: Object,
      required: true
    },
    isFirstInGroup: {
      type: Boolean,
      required: true
    },
    isLastInGroup: {
      type: Boolean,
      required: true
    }
  },
  mounted() {
    if (this.isFirstInGroup) {
      this.resetInterpolation()
      this.fadeAvatar()
    } else {
      this.interpolateAvatar()
    }
  },
  methods: {
    interpolateAvatar() {
      this.$nextTick(() => {
        const prevMessage = this.$el.previousElementSibling

        if (prevMessage) {
          const prevHeight = prevMessage.offsetHeight / 2
          const thisHeight = this.$el.offsetHeight / 2

          document.documentElement.style.setProperty(
            '--avatar-slide-distance',
            `-${prevHeight + thisHeight + 16}px`
          )
        }
      })
    },
    fadeAvatar() {
      this.$el.classList.add('fade-in')
    },
    resetInterpolation() {
      document.documentElement.style.setProperty('--avatar-slide-distance', '0')
    }
  }
}
</script>

<style>
:root {
  --avatar-slide-distance: 0px;
}

.message .avatar-wrapper {
  position: relative;
  width: 40px;
}

.message .avatar {
  position: absolute;
  clip-path: circle(20px);
  width: 40px;
  height: 40px;
  top: -20px;
  animation: slide-in 0.5s ease-in-out both;
}

.fade-in {
  animation: fade-in 0.5s ease-in-out both;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slide-in {
  0% {
    transform: translateY(var(--avatar-slide-distance));
  }

  100% {
    transform: translateY(0);
  }
}

.message .content {
  position: relative;
  top: inherit;
  left: inherit;
  padding-left: 0.22em;
  padding-right: 0.25em;
  padding-top: 0.25em;
  padding-bottom: 0.25em;

  margin-left: 2em;
  margin-right: 2em;

  max-width: 75%;

  height: fit-content;
}

.message .content span {
  animation: fade 0.15s ease-in 0.1s 1 both;
}

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
