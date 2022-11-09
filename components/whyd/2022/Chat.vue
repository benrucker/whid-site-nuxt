<template>
  <div v-if="stats != null" id="the-one-above-conversation" @click="onClick">
    <div id="conversation" class="container">
      <Whyd2022ChatMessage
        v-for="(msg, index) in displayed"
        :key="msg.id"
        :ref="msg.type"
        :stats="stats"
        :is-last-in-group="displayed[index + 1]?.author !== msg.author"
        :is-first-in-group="displayed[index - 1]?.author !== msg.author"
        :msg="msg"
        :index="index"
        @graphFixed="handleGraphFixed"
      />
      <div id="afterLastMessage">
        <div id="afterLastMessageInner" ref="afterLastMessage" />
      </div>
      <div
        v-if="showTyping && !advancingIsDisabled"
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
      <div
        v-if="showHint && !advancingIsDisabled"
        class="hint text-center text-muted"
      >
        Click to continue!
      </div>
      <div style="height: 80vh" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true
    },
    stats: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      advancingIsDisabled: false,
      autoAdvanceTimeout: undefined,
      debugShowAll: true,
      debugShowAllLimit: 60,
      displayed: [],
      messagesPosition: 0,
      showHint: true,
      showTyping: true,
      waitingToAutomaticallyAdvance: false
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.debugShowAll) {
        const length = this.messages.length
        let i = length
        while (i > Math.max(length - this.debugShowAllLimit, 1)) {
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
      } else if (this.advancingIsDisabled) {
        return
      }
      this.advance()
    },
    advance() {
      this.showHint = false
      this.showTyping = false

      if (this.messages.length > 0) {
        const messageInfo = this.messages[this.messagesPosition++]

        if (messageInfo.function) {
          messageInfo.content = this.runFunc(
            messageInfo.function,
            messageInfo.content
          )
        }

        messageInfo.author =
          messageInfo.author ?? this.displayed[this.displayed.length - 1].author
        messageInfo.side =
          messageInfo.side ?? this.getDefaultSide(messageInfo.author)
        messageInfo.color =
          messageInfo.color ?? messageInfo.author.toLowerCase()

        this.displayed.push(messageInfo)

        setTimeout(() => {
          this.$refs.afterLastMessage.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        }, 50)
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
    getDefaultSide(author) {
      const sides = {
        JermaBot: 'left',
        Shigure: 'right',
        FredBoat: 'right',
        Unanimism: 'left',
        UsBot: 'left',
        NotSoBot: 'right',
        Perlymolt: 'left',
        SecuityBot: 'left'
      }
      return sides[author]
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
    },
    leagueOrApex(content) {
      const roles = this.stats.user.manual.roles ?? []
      if (roles.includes('leg') && roles.includes('gaysex legends')) {
        return content.both
      } else if (roles.includes('leg')) {
        return content.league
      } else if (roles.includes('gaysex legends')) {
        return content.apex
      } else {
        return content.neither
      }
    },
    fixMostReactedToImages(content) {
      // the [0] is needed for some reason
      this.disableAdvancing()
      this.$refs.ChartMostReactedToImages[0].propogateEvent('fix')
      return content
    },
    fixReactionsGraph(content) {
      this.disableAdvancing()
      this.$refs.ChartMostUsedReactions[0].propogateEvent('fix')
      return content
    },
    handleGraphFixed() {
      this.enableAdvancing()
    },
    chooseRandomIp(content) {
      return this.chooseRandomOption(content.ips) + ' ' + content.suffix
    },
    chooseRandomOption(content) {
      return content[Math.floor(Math.random() * content.length)]
    },
    disableAdvancing() {
      this.advancingIsDisabled = true
    },
    enableAdvancing() {
      this.advancingIsDisabled = false
    }
  }
}
</script>

<style>
:root {
  --convo-width: 100vw;
}

#the-one-above-conversation {
  overflow-x: hidden;
}

#afterLastMessage {
  position: relative;
}

#afterLastMessage #afterLastMessageInner {
  position: absolute;
  top: -30vh;
}

#conversation {
  min-height: 2em;
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
