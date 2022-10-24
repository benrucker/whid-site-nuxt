<template>
  <div
    v-if="stats != null"
    id="conversation"
    class="container"
    @click="onClick"
  >
    <Whyd2022Message
      v-for="(msg, index) in displayed"
      :key="msg.id"
      :stats="stats"
      :is-last-in-group="
        !displayed[index + 1] || displayed[index + 1].author !== msg.author
      "
      :is-first-in-group="
        !displayed[index - 1] || displayed[index - 1].author !== msg.author
      "
      :msg="msg"
      :index="index"
    />
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
  asyncData({ params }) {
    return {
      username: params.username
    }
  },
  data() {
    return {
      messages: [],
      displayed: [],
      showHint: true,
      showTyping: true,
      waitingToAutomaticallyAdvance: false,
      autoAdvanceTimeout: undefined,
      debugShowAll: true,
      stats: null
    }
  },
  async fetch() {
    this.messages = (await this.$nuxt.$content('messages').fetch()).messages
    this.messages.forEach((v, i) => {
      v.id = i
    })
    // get data from static/whyd/2022/data/*
  },
  async mounted() {
    const server = await fetch('/whyd/2022/data/server.json').then((r) =>
      r.json()
    )
    const namesToIds = server.namesToIds
    const user = await fetch(
      `/whyd/2022/data/${namesToIds[this.username]}.json`
    ).then((r) => r.json())

    this.stats = { server, user }

    setTimeout(() => {
      if (this.debugShowAll) {
        let i = this.messages.length
        while (i > 1) {
          this.advance()
          i--
        }
      }
    })
  },
  methods: {
    onClick() {
      if (this.waitingToAutomaticallyAdvance) {
        clearTimeout(this.autoAdvanceTimeout)
        this.waitingToAutomaticallyAdvance = false
      }
      this.advance()
    },
    advance() {
      this.showHint = false
      this.showTyping = false

      if (this.messages.length > 0) {
        const messageInfo = this.messages.shift()

        if (messageInfo.function) {
          messageInfo.content = this.runFunc(
            messageInfo.function,
            messageInfo.content
          )
        }

        this.displayed.push(messageInfo)

        this.$el.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }

      if (this.messages.length > 0) {
        setTimeout(() => {
          this.showHint = true
        }, 100)
        setTimeout(() => {
          this.showTyping = true
        }, 100)
      }
    },
    runFunc(name, content) {
      const func = this[name]
      if (typeof func !== 'function') {
        return `Function ${name} not found`
      }
      return func(content)
    },
    testFunctionText() {
      return 'text!'
    },
    next(content) {
      this.waitingToAutomaticallyAdvance = true
      this.autoAdvaceTimeout = setTimeout(this.advance, 500)
      return content
    }
  }
}
</script>

<style>
:root {
  --convo-width: 100vw;
}

#conversation {
  min-height: 2em;
  overflow-y: hidden;
  width: var(--convo-width);
  padding: 0;
  min-height: 80vh;
}

@media (min-width: 576px) {
  #conversation {
    --convo-width: 540px;
  }
}
@media (min-width: 768px) {
  #conversation {
    --convo-width: 660px;
  }
}
@media (min-width: 992px) {
  #conversation {
    --convo-width: 660px;
  }
}
@media (min-width: 1200px) {
  #conversation {
    --convo-width: 720px;
  }
}
@media (min-width: 1400px) {
  #conversation {
    width: 720px;
    padding: 0;
  }
}

.message {
  width: 100%;
  display: flex;
  margin-top: 16px;
  margin-bottom: 16px;
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
