<template>
  <div id="conversation" class="container" @click="advance">
    <div
      v-for="(msg, index) in displayed"
      :key="msg.id"
      :class="
        msg.side +
        ' message' +
        (!displayed[index + 1] || displayed[index + 1].author !== msg.author
          ? ' message-tail'
          : ' ')
      "
    >
      <span class="authorWrapper">
        <img
          v-if="
            !displayed[index + 1] || displayed[index + 1].author !== msg.author
          "
          :key="index"
          src="/whyd/2021/emojis/cheeto.png"
          class="author"
        />
      </span>
      <div class="content">
        <component
          :is="'Whyd2022' + (msg.type || 'Text')"
          :content="msg.content"
          :data="{ messageCountThisYear: 50, userWordCountThisYear: 20 }"
        />
      </div>
    </div>
    <div
      v-if="showTyping"
      :class="'message typing ' + messages[0].side + ' text-muted'"
    >
      <div class="content">
        <div class="typingDots">
          <div class="t1" />
          <div class="t2" />
          <div class="t3" />
        </div>
      </div>
    </div>
    <div v-if="showHint" class="hint text-center text-muted">
      Click to continue!
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      displayed: [],
      showHint: true,
      showTyping: true
    }
  },
  async fetch() {
    this.messages = (await this.$nuxt.$content('messages').fetch()).messages
    this.messages.forEach((v, i) => {
      v.id = i
    })
  },
  async mounted() {},
  methods: {
    advance() {
      this.showHint = false
      this.showTyping = false

      if (this.messages.length > 0) {
        const messageInfo = this.messages.shift()

        if (messageInfo.function) {
          messageInfo.content = this.runFunc(messageInfo.function)
        }

        this.displayed.push(messageInfo)

        this.$el.scrollIntoView({ smooth: 'auto', block: 'end' })
      }

      if (this.messages.length > 0) {
        setTimeout(() => {
          this.showHint = true
        }, 100)
        setTimeout(() => {
          this.showTyping = true
        }, 100)
      }

      const lastMessage = document
        .getElementsByClassName('message message-tail')
        .item(0)

      if (lastMessage) {
        const h =
          lastMessage.offsetHeight > 32
            ? lastMessage.offsetHeight / 2
            : lastMessage.offsetHeight

        document.documentElement.style.setProperty(
          '--avatar-slide-distance',
          `calc(-${h}px - 1em)`
        )
      }
    },
    runFunc(name) {
      const func = this[name]
      if (typeof func !== 'function') {
        return `Function ${name} not found`
      }
      return func()
    },
    testFunctionText() {
      return 'text!'
    }
  }
}
</script>

<style>
:root {
  --avatar-slide-distance: -105%;
}

#conversation {
  min-height: 2em;
  overflow-y: hidden;
}

.message {
  width: 100%;
  display: flex;
  margin-top: 1em;
  margin-bottom: 1em;
  min-height: 2em;
  align-items: center;
}

.message.right {
  justify-content: end;
  flex-direction: row-reverse;
}

.message.left {
  justify-content: start;
}

.message .authorWrapper {
  position: relative;
  width: 40px;
}

.message .author {
  position: absolute;
  clip-path: circle(20px);
  width: 40px;
  height: 40px;
  top: -20px;
  animation: slide-in 0.5s ease-in-out both;
  /* animation-delay: 0.25s; */
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
  background-color: darkgray;
  clip-path: circle(0.3em);
  margin-left: 0.1em;
  margin-right: 0.1em;

  animation-name: pulse;
  animation-duration: 2.75s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;

  opacity: 0.75;
  mix-blend-mode: lighten;
}

@keyframes pulse {
  0% {
    background-color: rgb(170, 170, 170);
  }

  50% {
    background-color: rgb(255, 255, 255);
  }

  100% {
    background-color: rgb(170, 170, 170);
  }
}

.hint {
  animation-name: fade;
  animation-delay: 3s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-duration: 3s;
}

@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
