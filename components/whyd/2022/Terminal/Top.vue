<template>
  <div ref="top" class="top" @mousedown="terminalMouseDown($event)">
    <strong>whydOS</strong>
    <div class="top-buttons">
      <!-- <i style="cursor: pointer" @click="toggleButtons">btn</i> -->
      <strong
        class="bi bi-x"
        style="cursor: pointer; margin-right: 4px"
        @click="toggleTerminalVisibility"
        >x</strong
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      timesCloseAttempted: 0,
      topRef: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.topRef = this.$refs.top
    })
  },
  methods: {
    toggleTerminalVisibility() {
      if (this.timesCloseAttempted === 10) {
        this.$emit('hideTerminal')
      } else {
        alert('The Terminal cannot be closed at this time.')
      }
      this.timesCloseAttempted++
    },
    terminalMouseDown(event) {
      console.log('doing')
      this.$emit(
        'clicked',
        event.clientX - this.topRef.getBoundingClientRect().left,
        event.clientY - this.topRef.getBoundingClientRect().top
      )
    }
  }
}
</script>

<style>
.top {
  display: flex;
  justify-content: space-between;
  background-color: inherit;
  color: var(--background);
  user-select: none;
}
</style>
