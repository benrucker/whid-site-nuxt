<template>
  <div
    id="page"
    @mouseup="terminalMouseUp"
    @mousemove="terminalMouseMove($event)"
  >
    <Whyd2022Terminal ref="terminal" />
  </div>
</template>

<script>
export default {
  layout: 'blank',
  data() {
    return {
      terminalRef: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.terminalRef = this.$refs.terminal
    })
  },
  methods: {
    terminalMouseUp() {
      this.$refs.terminal.terminalMouseUp()
    },
    terminalMouseMove(e) {
      this.terminalRef.terminalMouseMove(e)
    }
  }
}
</script>

<style scoped>
#page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
