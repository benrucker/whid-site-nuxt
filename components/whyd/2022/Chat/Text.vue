<template>
  <span class="parsed-text">
    <span
      v-for="token in parsedContent"
      :key="token.text !== '' ? token.text : token.src"
      :class="token.styles"
      ><span v-if="token.text != null">{{ token.text }}</span
      ><img v-else :src="token.src"
    /></span>
  </span>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    stats: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      parsedContent: [],
      values: {
        messageCountThisYear: () => this.stats.server.totalMessages,
        userWordCountThisYear: () =>
          this.stats.user['Number of Words Sent Per User'],
        userMessageCountThisYear: () =>
          this.stats.user['Number of Messages per User'],
        userMessagePercentageThisYear: () =>
          this.stats.user['Percentage of Messages per Users']
      }
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
  }
}

function parseValue(data, values) {
  const nameAndStyle = data.slice(2, -2)
  const [valueName, styles] = nameAndStyle.split(' | ')
  if (valueName in values) {
    return { text: getValue(values, valueName), styles }
  } else {
    return { text: valueName, styles }
  }
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
  return { src: `/whyd/2022/emojis/${emojiName}.png` }
}
</script>

<style>
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

.parsed-text img {
  height: 1em;
}
</style>
