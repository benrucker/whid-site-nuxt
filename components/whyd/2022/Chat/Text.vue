<template>
  <span class="parsed-text">
    <template v-for="token in parsedContent"
      ><span
        v-if="token.text != null && token.text !== ''"
        :key="token.text"
        :class="token.styles + ' text'"
        >{{ token.text }}</span
      ><span
        v-if="token.emoji"
        :key="token.src"
        class="emoji"
        :class="token.styles"
        ><img :src="token.src" /></span
    ></template>
  </span>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: '',
    },
    stats: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      parsedContent: [],
      values: {
        messageCountThisYear: () => this.stats.server.totalMessages,
        user: () => this.stats.user.name,
        userWordCountThisYear: () =>
          this.stats.user['Number of Words Sent Per User'],
        userMessageCountThisYear: () =>
          this.stats.user['Number of Messages per User'],
        userMessagePercentageThisYear: () =>
          this.stats.user['Percentage of Messages per Users'],
        serverMostUpvotedUser: () =>
          this.idToName(Object.keys(this.stats.server['Most Upvoted User'])[0]),
        serverMostUpvotedUserCount: () =>
          Object.values(this.stats.server['Most Upvoted User'])[0],
        serverMostDownvotedUser: () =>
          this.idToName(
            Object.keys(this.stats.server['Most Downvoted User'])[0],
          ),
        serverMostDownvotedUserCount: () =>
          Object.values(this.stats.server['Most Downvoted User'])[0],
        mostPopularRole: () =>
          Object.keys(this.stats.server.mostPopularRole)[0],
        mostPopularRoleCount: () =>
          Object.values(this.stats.server.mostPopularRole)[0],
      },
    }
  },
  mounted() {
    this.parsedContent = this.content.split(/(\{+.+?}+)/g).map((token) => {
      if (token.startsWith('{{') && token.endsWith('}}')) {
        return parseValue(token, this.values)
      } else if (token.startsWith('{') && token.endsWith('}')) {
        if (token.startsWith('{:') && token.endsWith(':}')) {
          return parseEmoji(token)
        } else {
          return parseStyling(token)
        }
      } else {
        return { text: token }
      }
    })
  },
  methods: {
    idToName(id) {
      return this.stats.server.idsToNames[id]
    },
  },
}

function parseValue(data, values) {
  const nameAndStyle = data.slice(2, -2)
  const [valueName, styles] = nameAndStyle.split(' | ')
  return { text: getValue(values, valueName), styles }
}

function getValue(values, valueName) {
  if (valueName in values) {
    const value = values[valueName]()
    if (typeof value === 'number') {
      return value.toLocaleString()
      // eslint-disable-next-line eqeqeq
    } else if (Number.parseInt(value) == value) {
      return Number.parseInt(value).toLocaleString()
      // eslint-disable-next-line eqeqeq
    } else if (Number.parseFloat(value) == value) {
      return Number.parseFloat(value).toLocaleString()
    } else {
      return value
    }
  } else {
    console.warn(`Value ${valueName} not found`)
    return valueName
  }
}

function parseStyling(data) {
  const textAndStyle = data.slice(1, -1)
  const [text, styles] = textAndStyle.split(' | ')
  return { text, styles }
}

function parseEmoji(data) {
  const emojiName = data.slice(2, -2)
  return { src: `/whyd/2022/data/emojis/${emojiName}.png`, emoji: true }
}
</script>

<style>
.parsed-text .text {
  white-space: pre-wrap;
}

.parsed-text .bold {
  font-weight: bold;
}

.parsed-text .italic {
  font-style: oblique;
}

.parsed-text .number {
  font-family: monospace;
  border: 2px;
  text-shadow: 0px 0px 5px rgb(255, 255, 255);
}

.parsed-text .channel,
.parsed-text .role,
.parsed-text .mention {
  background-color: hsla(235, 85%, 64.7%, 0.7);
  border-radius: 5px;
  color: white;
  padding: 0 2px;
}

.parsed-text .channel:hover {
  background-color: hsl(235, 86%, 65%);
}

.parsed-text .emoji {
  height: 19px;
  width: 15px;
  display: inline-flex;
  align-items: center;
  position: relative;
}

.parsed-text .emoji img {
  max-height: 1.1em;
  max-width: 1.1em;
  top: calc(0.3em - 0.1em);
  left: calc(0.05em - 0.1em);
  position: absolute;
}

.parsed-text .error {
  color: var(--error);
}

.parsed-text .success {
  color: var(--success);
}

.parsed-text .underline {
  text-decoration: underline;
}

.parsed-text .tall {
  padding: 5px 0 5px 0;
  display: inline-block;
}
</style>
