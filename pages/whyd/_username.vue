<template>
  <div id="conversation" class="container" @click="advance">
    <div v-for="msg in displayed" :key="msg.id" :class="msg.side + ' message'">
      <span class="author">
        {{ msg.author }}
      </span>
      <div class="content">
        <component :is="'Whyd2022' + (msg.type || 'Text')" :content="msg.content" />
      </div>
    </div>
    <div v-if="showTyping" :class="'message typing ' + messages[0].side + ' text-muted'">
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
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
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
  data () {
    return {
      messages: [],
      displayed: [],
      showHint: true,
      showTyping: true
    }
  },
  async fetch () {
    this.messages = (await this.$nuxt.$content('messages').fetch()).messages
    this.messages.forEach((v, i) => { v.id = i })
  },
  async mounted () {
  },
  methods: {
    advance () {
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
        setTimeout(() => { this.showHint = true }, 100)
        setTimeout(() => { this.showTyping = true }, 100)
      }
    },
    runFunc (name) {
      const func = this[name]
      if (typeof func !== 'function') {
        return `Function ${name} not found`
      }
      return func()
    },
    testFunctionText () {
      return 'text!'
    },
    testFunctionImage () {
      return (
        '<img src="/whyd/2021/construction.png" class="w-100 bg-white">'
      )
    }
  }
}
</script>

<style>
#conversation {
    /* border-width: 2px;
    border-color: red; */
    /* border-style: solid; */
    min-height: 2em;
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
}

.message.left {
    justify-content: start;
}

.message .author {
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(1,64,102,1) 48%, rgba(0,212,255,1) 100%);  clip-path: circle(20px);
  width: 40px;
  height: 40px;
}

.message .content {
    position: absolute;
    top: inherit;
    left: inherit;
    padding-left: 0.25em;
    padding-right: 0.25em;
    padding-top: 0.25em;
    padding-bottom: 0.25em;

    margin-left: 4em;
    margin-right: 4em;
}

.message .content span {
  animation: fade 0.15s ease-in 0.1s 1 both;
  mix-blend-mode: lighten;
}

.message .content::after {
    position: absolute;
    z-index: -1;
    width: calc(100% + 1em);
    height: 100%;
    bottom: 0;

    animation: expand 0.2s ease-out 0s 1 both;

    content: "";
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

    left: -0.5em;

    border-bottom-right-radius: 1em;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    border-top-left-radius: 1em;
}

.typing .content::after {
  animation-delay: 1s;
}

.typing .content .typingDots {
    height: 1em;
    margin-top: .1em;
    margin-bottom: .1em;

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
