<template>
  <span>
    <span
      v-for="token in parsedContent"
      :key="token.text"
      :class="token.style"
      >{{ token.text }}</span
    >
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
      } else if (token.startsWith('{') && token.endsWith('}')) {
        return parseStyling(token)
      } else {
        return { text: token }
      }
    })
  }
}

function parseStyling(data) {
  const noCurlies = data.slice(1, -1)
  const [text, styles] = noCurlies.split(' | ')
  return { text, style: styles }
}

function parseValue(token, values) {
  const value = token.slice(2, -2)
  const style = 'number'
  if (value in values) {
    return { text: values[value](), style }
  } else {
    return { text: value, style }
  }
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
</style>
