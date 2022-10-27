<template>
  <div id="terminal" ref="terminal">
    <div v-show="isShowTerminal" class="outer">
      <Whyd2022TerminalTop
        @hideTerminal="hideTerminal"
        @clicked="terminalMouseDown"
      />
      <div id="textViewport" class="center" @click="focusInput">
        <div v-for="(text, index) in displayedTerminalContent" :key="index">
          <p
            v-for="(line, idx) of text.content.split('\n')"
            :key="idx"
            :class="text.class"
          >
            {{ line }}
          </p>
        </div>
        <Whyd2022TerminalUserInputArea
          ref="inputArea"
          @scrollToBottom="scrollToBottom"
          @addTextLine="addTextLine"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      isShowTerminal: true,
      displayedTerminalContent: [],
      offsetX: 40,
      offsetY: 40,
      dragging: false
    }
  },
  mounted() {
    this.scrollToBottom()
  },
  methods: {
    hideTerminal() {
      this.isShowTerminal = !this.isShowTerminal
    },
    addTextLine(line) {
      this.displayedTerminalContent.push(line)
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.inputArea.$el.scrollIntoView({ block: 'start' })
      })
    },
    focusInput() {
      this.$refs.inputArea.focusInput()
    },
    moveTerminal(x, y) {
      const terminal = this.$refs.terminal
      terminal.style.left = x + 'px'
      terminal.style.top = y + 'px'
    },
    terminalMouseMove(event) {
      // called externally
      if (this.dragging) {
        this.moveTerminal(
          event.clientX - this.offsetX,
          event.clientY - this.offsetY
        )
      }
    },
    terminalMouseDown(offsetX, offsetY) {
      this.dragging = true
      this.offsetX = offsetX
      this.offsetY = offsetY
    },
    terminalMouseUp() {
      // called externally
      this.dragging = false
    }
  }
}
</script>

<style>
:root {
  --primary: #c7c1a7; /* sage */
  --secondary: #eec584; /* gold */
  --outline: #b6a083; /* beige*/
  --background: #171214; /* background */
}

.outer {
  width: 600px;
  height: 400px;
  padding: 1rem;
  position: relative;
  padding: 3px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: var(--outline);
  font-family: monospace;
}

.center {
  background-color: var(--background);
  color: var(--primary);
  padding: 1.5em;
  user-select: none;
  overflow-y: auto;
  flex: 1;
}

#terminal {
  position: absolute;
  left: 40px;
  top: 40px;
}

#textViewport p {
  margin-bottom: 0.25em;
}

.redo {
  color: var(--primary);
  width: 50px;
  height: 50px;
}

p.error-text {
  color: red;
}

p.italic-text {
  font-style: italic;
}
</style>
