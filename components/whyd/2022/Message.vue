<template>
  <div :class="msg.side + ' message' + (isLastInGroup ? ' message-tail' : ' ')">
    <span class="avatar-wrapper">
      <img
        v-if="isLastInGroup"
        :key="index"
        src="/whyd/2021/emojis/cheeto.png"
        class="avatar"
      />
    </span>
    <div class="content">
      <component
        :is="'Whyd2022' + (msg.type || 'Text')"
        :content="msg.content"
        :data="data"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
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
  padding-left: 0.25em;
  padding-right: 0.25em;
  padding-top: 0.25em;
  padding-bottom: 0.25em;

  margin-left: 2em;
  margin-right: 2em;

  max-width: 80%;
}

.message .content span {
  animation: fade 0.15s ease-in 0.1s 1 both;
  mix-blend-mode: lighten;
}

.message .content::after {
  position: absolute;
  z-index: -1;
  width: calc(100% + 1em);
  bottom: 0;

  animation: expand 0.2s ease-out 0s 1 both;

  content: '';
}

.message-tail .content::before {
  position: absolute;
  z-index: -1;
  width: 2em;
  min-height: 2em;
  max-height: 2em;

  bottom: -1.2em;
  border: 1px solid transparent;

  animation: tail-expand 0.2s ease-out 0.1s 1 both;

  content: '';
}

@keyframes tail-expand {
  0% {
    opacity: 0;
    width: 0;
    height: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    width: 2em;
    height: 2em;
  }
}

@keyframes expand {
  0% {
    opacity: 0;
    width: 50%;
    height: 50%;
  }

  100% {
    opacity: 1;
    width: (100% + 1em);
    height: 100%;
  }
}

.message.right .content::after {
  background-color: rgb(37, 145, 181);
  transform: skewX(9deg);

  right: -0.5em;

  border-bottom-right-radius: 0;
  border-bottom-left-radius: 1em;
  border-top-right-radius: 1em;
  border-top-left-radius: 0;
}

.message.left .content::after {
  background-color: gray;
  transform: skewX(-9deg);
  transform-origin: bottom left;

  left: -0.5em;

  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 1em;
}

.message-tail.left .content::before {
  left: -0.53em;
  clip-path: polygon(0 0, 100% 0, 0 75%);
  transform: skewX(-9deg);
  transform-origin: left;
  background: grey;
}

.message-tail.right .content::before {
  right: -0.69em;
  clip-path: polygon(0 0, 100% 0, 100% 75%);
  transform: skewX(9deg);
  background-color: rgb(37, 145, 181);
}
</style>
