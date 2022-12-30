<template>
  <div id="terminal" ref="terminal">
    <div v-show="isShowTerminal" class="outer">
      <Whyd2022TerminalTop
        @hideTerminal="hideTerminal"
        @clicked="terminalMouseDown"
      />
      <div
        id="textViewport"
        class="center text-view"
        :style="{ cursor: isTerminalClickContinue ? 'pointer' : 'default' }"
        @click="focusInput"
      >
        <div v-for="text in displayedTerminalContent" :key="text.id">
          <img
            v-if="text.type === 'image'"
            :src="text.url"
            width="120px"
            height="100px"
            class="terminal-image"
          />
          <Whyd2022ChatText
            v-for="(line, idx) of text.content.split('\n')"
            :key="idx"
            style="display: block"
            :content="line"
          />
        </div>
        <Whyd2022TerminalUserInputArea
          ref="inputArea"
          @scrollToBottom="scrollToBottom"
          @addTextLine="addTextLine"
          @selfDestruct="selfDestruct"
        />
      </div>
      <Whyd2022TerminalPasswordInputArea
        v-if="!loggedIn"
        class="center"
        @logIn="logIn"
      ></Whyd2022TerminalPasswordInputArea>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      isShowTerminal: true,
      terminalContent: [],
      offsetX: 40,
      offsetY: 40,
      dragging: false,
      loggedIn: false,
      inputAreaRef: undefined,
    }
  },
  computed: {
    displayedTerminalContent() {
      return this.terminalContent.slice(-50)
    },
    isTerminalClickContinue() {
      if (this.inputAreaRef == null) {
        return false
      }

      return this.inputAreaRef.getTerminalMode() === 'clickContinue'
    },
  },
  mounted() {
    this.scrollToBottom()
    this.terminalContent = []

    this.$nextTick(() => {
      this.inputAreaRef = this.$refs.inputArea
    })
  },
  methods: {
    hideTerminal() {
      this.isShowTerminal = !this.isShowTerminal
    },
    addTextLine(line) {
      this.terminalContent.push(line)
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.inputArea.$el.scrollIntoView({ block: 'start' })
      })
    },
    selfDestruct() {
      const el = document.createElement('div')
      el.classList.add('secbot-explosion')
      this.$refs.terminal.appendChild(el)
    },
    focusInput() {
      this.$refs.inputArea.focusInput()
    },
    logIn() {
      this.loggedIn = true
      this.$refs.inputArea.logIn()
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
          event.clientY - this.offsetY,
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
    },
  },
}
</script>

<style>
:root {
  --primary: #c7c1a7;
  --secondary: #eec584;
  --outline: #b6a083;
  --background: #171214;
  --error: rgb(205 48 48);
  --success: rgb(77, 177, 77);
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
  overflow-y: clip;
}

.center {
  background-color: var(--background);
  user-select: none;
}

.text-view {
  color: var(--primary);
  padding: 1.5em;
  overflow-y: auto;
  flex: 1;
}

.pass-view {
  position: absolute;
  top: 1.75em;
  width: 99%;
  height: 92%;
}

#textViewport p {
  margin-bottom: 0.25em;
}

.redo {
  color: var(--primary);
  width: 50px;
  height: 50px;
}

.terminal-image {
  filter: sepia(0.6);
}

.secbot-explosion {
  background: url('/whyd/2022/explosion-sheet.png');
  width: 71px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: scale(15, 10);
  image-rendering: pixelated;
  position: absolute;

  animation: explosion-sprite 1s steps(18) forwards;
}

@keyframes explosion-sprite {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -1278px 0;
  }
}
</style>
