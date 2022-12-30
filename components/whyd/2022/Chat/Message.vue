<template>
  <div
    :class="`${msg.side} ${msg.color} message ${
      isFirstInGroup ? 'first-in-group' : ''
    }`"
  >
    <span class="avatar-wrapper">
      <img
        :key="index"
        ref="avatar"
        :src="`/whyd/2022/bots/${msg.author}.png`"
        class="avatar hide"
      />
    </span>
    <div v-if="isFirstInGroup" class="author-name text-muted">
      {{ msg.author }}
    </div>
    <div
      :class="`content ${
        msg.type !== 'Text' && msg.hideBubble ? 'not-text' : ''
      }`"
    >
      <Whyd2022ChatBubble
        v-if="!msg.hideBubble"
        ref="bubble"
        :msg-id="msg.id"
        :color="msg.color"
        :is-last-in-group="isLastInGroup"
      />
      <component
        :is="'Whyd2022Chat' + (msg.type || 'Text')"
        ref="component"
        :content="msg.content"
        :stats="stats"
        @graphFixed="handleGraphFixed"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    msg: {
      type: Object,
      required: true,
    },
    isFirstInGroup: {
      type: Boolean,
      required: true,
    },
    isLastInGroup: {
      type: Boolean,
      required: true,
    },
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
      setTimeout(() => {
        const prevMessage = this.$el.previousElementSibling
        const prevAvatar = prevMessage.querySelector('img.avatar')

        if (prevAvatar == null) {
          console.warn('bailing out of sliding avatar')
          return
        }

        const prevHeight = prevMessage.offsetHeight / 2
        const thisHeight = this.$el.offsetHeight / 2

        document.documentElement.style.setProperty(
          '--avatar-slide-distance',
          `-${prevHeight + thisHeight + 6}px`,
        )
        this.$refs.avatar.classList.remove('hide')
        this.$refs.avatar.classList.add('show')
        prevAvatar.classList.remove('fade-in')
        prevAvatar.classList.add('hide')
      }, 50)
    },
    fadeAvatar() {
      this.$refs.avatar.classList.add('fade-in')
      // this.$refs.avatar.classList.remove('hide')
    },
    resetInterpolation() {
      document.documentElement.style.setProperty('--avatar-slide-distance', '0')
    },
    propogateEvent(event) {
      this.$refs.component[event]()
    },
    handleGraphFixed() {
      this.$emit('graphFixed')
    },
  },
}
</script>

<style>
:root {
  --avatar-slide-distance: 0px;
}

.jermabot {
  --bubble-color: #646464;
  --text-color: white;
}
.shigure {
  --bubble-color: #2f618b;
  --text-color: white;
}
.fredboat {
  --bubble-color: #1cbfe2;
  --text-color: #131922;
}
.unanimism {
  /* --bubble-color: #e0e169; */
  /* --text-color: #111; */
  /* --bubble-color: #5684ae; */
  /* --text-color: white; */
  --bubble-color: #9fd7d7;
  --text-color: #131e22;
}
.usbot {
  --bubble-color: #d73d3d;
  --text-color: white;
}
.notsobot {
  --bubble-color: #554c58;
  --text-color: white;
}
.secuitybot {
  --bubble-color: antiquewhite;
  --text-color: black;
  --text-style: serif;
}
.perlymolt {
  --bubble-color: #ed5a22;
  --text-color: white;
}

.message {
  position: relative;
}

.message.first-in-group {
  margin-top: 30px;
}

.author-name {
  position: absolute;
  top: -18px;
  font-weight: 500;
  font-size: 12px;
  opacity: 0.5;
  animation: fade-in 0.5s ease-in-out both;
}

.right .author-name {
  right: 75px;
}

.left .author-name {
  left: 75px;
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
  top: -15px;
  animation: none;
  user-select: none;
}

.message .avatar.show {
  animation: slide-in 0.5s ease-in-out both;
}

.message .avatar.hide {
  opacity: 0;
}

.fade-in {
  animation: fade-in 0.5s ease-in-out both !important;
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

  color: var(--text-color);
  font-family: var(--text-style);
}

.message .content.not-text {
  margin-left: 1em;
  margin-right: 1em;
}

.message .content span {
  animation: fade 0.15s ease-in 0.1s 1 both;
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
</style>
