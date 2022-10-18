<template>
  <span>
    <span v-for="token in parsedContent" :key="token.text" :class="token.style"
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
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      parsedContent: [],
      values: {
        messageCountThisYear: () => this.data.messageCountThisYear,
        userWordCountThisYear: () => this.data.userWordCountThisYear
      }
    }
  },
  mounted() {
    this.parsedContent = this.content.split(/(\{+.+?}+)/g).map((token) => {
      if (token.startsWith('{{') && token.endsWith('}}')) {
        return parseValue(token, this.values)
      } else if (token.startsWith('{:') && token.endsWith(':}')) {
        return parseEmoji(token)
      } else if (token.startsWith('{') && token.endsWith('}')) {
        return parseStyling(token)
      } else {
        return { text: token }
      }
    })
  }
}

function parseValue(data, values) {
  const nameAndStyle = data.slice(2, -2)
  const [valueName, style] = nameAndStyle.split(' | ')
  if (valueName in values) {
    return { text: values[valueName](), style }
  } else {
    return { text: valueName, style }
  }
}

function parseStyling(data) {
  const textAndStyle = data.slice(1, -1)
  const [text, styles] = textAndStyle.split(' | ')
  return { text, style: styles }
}

function parseEmoji(data) {
  const emojiName = data.slice(2, -2)
  return { src: `/whyd/2022/emojis/${emojiName}.png` }
}
</script>

<style>
.bold {
  font-weight: bold;
}
.italic {
  font-style: oblique;
}
.number {
  font-family: monospace;
}
img {
  height: 1em;
}
</style>
