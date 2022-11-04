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
      <Whyd2022ChatBubble
        v-if="!msg.hideBubble"
        ref="bubble"
        :msg-id="msg.id"
        :is-last-in-group="isLastInGroup"
      />
      <component
        :is="'Whyd2022Chat' + (msg.type || 'Text')"
        ref="component"
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
    },
    propogateEvent(event) {
      this.$refs.component[event]()
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
</style>
