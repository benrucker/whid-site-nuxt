<template>
  <span>
    <span v-for="data in parsedContent" :key="data.text" :class="data.style">{{
      data.text
    }}</span>
  </span>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      parsedContent: []
    }
  },
  mounted() {
    this.parsedContent = this.content.split(/(\{+.+?}+)/g).map((v) => {
      if (v.startsWith('{{') && v.endsWith('}}')) {
        return parseValue(v)
      } else if (v.startsWith('{') && v.endsWith('}')) {
        return parseStyling(v)
      } else {
        return { text: v }
      }
    })
  }
}

function parseStyling(data) {
  const noCurlies = data.slice(1, -1)
  const [text, styles] = noCurlies.split(' | ')
  return { text, style: styles }
}

function parseValue(valueName) {
  // TODO - parse value
  const noCurlies = valueName.slice(2, -2)
  return { text: `$${noCurlies}`, style: 'number' }
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
