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
          <Whyd2022ChatText
            v-for="(line, idx) of text.content.split('\n')"
            :key="idx"
            :content="line"
            :class="text.block ? 'block' : ''"
          />
          <img
            v-if="text.type === 'image'"
            :src="text.url"
            :width="text?.width ?? '120px'"
            :height="text?.height ?? '100px'"
            class="terminal-image"
          />
          <Whyd2022ChatText
            v-if="text.lastLineInCommand"
            :key="`last${text.id}`"
            content="{End of Command | underline block}"
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

<style scoped>
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

.terminal-image {
  filter: sepia(0.6);
}

.block {
  display: block;
}

#textViewport p {
  margin-bottom: 0.25em;
}

div#textViewport::-webkit-scrollbar {
  height: 20px;
  width: 10px;
}
div#textViewport::-webkit-scrollbar-button {
  background-color: var(--outline) !important;
  height: 0px;
  width: 10px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50%;
}
div#textViewport::-webkit-scrollbar-button:vertical:decrement {
  background-image: url('/score/arrowup.png');
}
div#textViewport::-webkit-scrollbar-button:vertical:increment {
  background-image: url('/score/arrowdown.png');
}
div#textViewport::-webkit-scrollbar-button:horizontal:decrement {
  background-image: url('/score/arrowleft.png');
}
div#textViewport::-webkit-scrollbar-button:horizontal:increment {
  background-image: url('/score/arrowright.png');
}
div#textViewport::-webkit-scrollbar-corner {
  background-color: var(--outline) !important;
}
div#textViewport::-webkit-scrollbar-thumb {
  border-radius: 0px !important;
  background-color: var(--outline) !important;
  border: 1px solid black !important;
}
div#textViewport::-webkit-scrollbar-track {
  border-radius: 0 !important;
  background-color: var(--background) !important;
}
</style>

<style>
#page {
  --primary: #c7c1a7;
  --secondary: #eec584;
  --outline: #b6a083;
  --background: #171214;
  --error: rgb(205 48 48);
  --success: rgb(77, 177, 77);
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
