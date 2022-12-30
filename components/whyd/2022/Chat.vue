<template>
  <div
    v-if="stats != null"
    id="the-one-above-conversation"
    ref="theOneAboveConversation"
    @click="onClick"
  >
    <Whyd2022ChatPrefetcher />
    <div id="conversation" ref="conversation" class="container">
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
      <Whyd2022ChatTypingIndicator
        v-if="showTyping && !advancingIsDisabled && areMoreMessagesRemaining()"
        :side="typingIndicatorSide"
        :is-first-in-group="typingIndicatorFirstInGroup"
      />
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
      required: true,
    },
    stats: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      advancingIsDisabled: false,
      autoAdvanceTimeout: undefined,
      debugShowAll: false,
      debugShowAllLimit: 110,
      displayed: [],
      messagesPosition: 0,
      showHint: true,
      showTyping: true,
      waitingToAutomaticallyAdvance: false,
      scrollTo: true,
    }
  },
  computed: {
    typingIndicatorSide() {
      return this.getDefaultSide(
        this.messages[this.messagesPosition].author ??
          this.displayed[this.messagesPosition - 1].author,
      )
    },
    typingIndicatorFirstInGroup() {
      return (
        this.messages[this.messagesPosition].author != null &&
        this.displayed[this.messagesPosition - 1]?.author !==
          this.messages[this.messagesPosition].author
      )
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.debugShowAll) this.autoAdvance()
    }, 50)
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
    autoAdvance() {
      this.advance()
      if (this.areMoreMessagesRemaining() && this.debugShowAllLimit-- > 0) {
        setTimeout(this.autoAdvance)
      } else {
        setTimeout(this.scrollToLast, 2000)
      }
    },
    advance() {
      this.showHint = false
      this.showTyping = false

      if (this.areMoreMessagesRemaining()) {
        const messageInfo = this.messages[this.messagesPosition++]
        if (messageInfo.function) {
          messageInfo.content = this.runFunc(
            messageInfo.function,
            messageInfo.content,
          )
        }
        messageInfo.author =
          messageInfo.author ?? this.displayed[this.displayed.length - 1].author
        messageInfo.side =
          messageInfo.side ?? this.getDefaultSide(messageInfo.author)
        messageInfo.color =
          messageInfo.color ?? messageInfo.author.toLowerCase()
        this.displayed.push(messageInfo)

        if (this.scrollTo) {
          setTimeout(this.scrollToLast, 50)
        }
      }

      if (this.areMoreMessagesRemaining()) {
        setTimeout(() => {
          this.showHint = true
        }, 100)
        setTimeout(() => {
          this.showTyping = true
        }, 100)
      }
    },
    areMoreMessagesRemaining() {
      return this.messagesPosition < this.messages.length
    },
    scrollToLast() {
      this.$refs.afterLastMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
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
        SecuityBot: 'left',
      }
      return sides[author]
    },
    disableScrollTo() {
      this.scrollTo = false
    },
    disableAdvancing() {
      if (!this.debugShowAll) this.advancingIsDisabled = true
    },
    enableAdvancing() {
      if (!this.debugShowAll) this.advancingIsDisabled = false
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
      this.autoAdvanceTimeout = setTimeout(this.advance, 500)
      return content
    },
    leagueOrApex(content) {
      const roles = this.stats.user?.manual?.roles ?? []
      if (roles.includes('leg') && roles.includes('gaysex legends')) {
        return content?.both
      } else if (roles.includes('leg')) {
        return content?.league
      } else if (roles.includes('gaysex legends')) {
        return content?.apex
      } else {
        return content?.neither
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
    chooseBirthdayMessage(content) {
      if (this.stats.user.birthdayWishes != null) {
        // eslint-disable-next-line vue/no-mutating-props
        this.messages.splice(this.messagesPosition, 0, {
          author: 'JermaBot',
          type: 'ChartBirthdayMessage',
          hideBubble: true,
        })
        return content[0]
      }
      return content[1]
    },
    chooseRoleFirstMessage(content) {
      let choices
      let output
      if (
        this.stats.user.secret_clubs != null &&
        JSON.parse(this.stats.user.secret_clubs).length > 0
      ) {
        choices = JSON.parse(this.stats.user.secret_clubs)
        output = content[0]
      } else if (
        this.stats.user.rare_roles != null &&
        JSON.parse(this.stats.user.rare_roles).length > 0
      ) {
        choices = JSON.parse(this.stats.user.rare_roles)
        output = content[0]
      } else if (
        this.stats.user.less_rare_roles != null &&
        JSON.parse(this.stats.user.less_rare_roles).length > 0
      ) {
        choices = JSON.parse(this.stats.user.less_rare_roles)
        output = content[0]
      } else if (this.stats.user.least_rare_role) {
        choices = [this.stats.user.least_rare_role]
        output = content[1]
      } else {
        output = content[2]
        return output
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.stats.user.featuredRole = this.chooseRandomOption(choices)
      // eslint-disable-next-line vue/no-mutating-props
      this.stats.user.featuredRoleCount =
        this.stats.server.roleCounts[this.stats.user.featuredRole]
      return output
    },
    chooseRoleSecondMessage(content) {
      if (
        this.stats.user.secret_clubs != null &&
        JSON.parse(this.stats.user.secret_clubs).length > 0
      ) {
        return content[0]
      } else if (
        this.stats.user.rare_roles != null &&
        JSON.parse(this.stats.user.rare_roles).length > 0
      ) {
        return content[1]
      } else if (
        this.stats.user.less_rare_roles != null &&
        JSON.parse(this.stats.user.less_rare_roles).length > 0
      ) {
        return content[2]
      } else if (this.stats.user.least_rare_role) {
        return content[3]
      } else {
        return content[4]
      }
    },
    beginEndAnimation() {
      this.debugShowAll = false
      this.disableAdvancing()
      localStorage.setItem('shouldShowTerminalAnimation', 'true')
      setTimeout(() => {
        this.$refs.theOneAboveConversation.classList.add('breaking')
        this.$refs.conversation.classList.add('breaking')
        setTimeout(() => {
          setInterval(this.advance, 1500)
        }, 1500)
      }, 1000)
      return ''
    },
    lastMessageSent(content) {
      setTimeout(async () => {
        await this.$router.push(`/whyd/terminal`)
      }, 5000)

      return content
    },
  },
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
  padding: 20px 0;
  min-height: 80vh;
  user-select: none;
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
  margin-top: 6px;
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

#conversation [title] {
  cursor: help;
}
</style>
