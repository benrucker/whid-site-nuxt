<template>
  <div>
    <div v-if="isShowTerminal" class="outer" @click="focusInput">
      <div class="top">
        <i
          class="bi bi-x"
          style="cursor: pointer"
          @click="toggleTerminalVisibility"
        ></i>
        <strong>whydOS</strong>
      </div>
      <div id="textViewport" class="center">
        <p v-for="line in displayedTerminalLines" :key="line">{{ line }}</p>
        <div id="last" ref="last" class="mb-0">
          >
          <span v-if="terminalMode === mode.textInput" id="userInputDisplay">{{
            userInput
          }}</span
          ><a ref="blinkingUnderscore" class="blink">_</a><br />
          <a
            v-if="isShowProceed && terminalMode === mode.clickContinue"
            style="cursor: pointer"
            @click="addLine"
          >
            Click to continue
          </a>
          <div
            v-if="terminalMode === mode.buttonInput"
            ref="buttonRegion"
            class="button-region"
          >
            <button
              type="button"
              class="option-button"
              value="1"
              @click="optionButtonClick($event)"
            >
              one
            </button>
            <button type="button" class="option-button" value="2">two</button>
            <button type="button" class="option-button" value="3">three</button>
          </div>
        </div>
      </div>
      <input
        id="terminalTextInput"
        ref="terminalTextInput"
        v-model="userInput"
        type="text"
        @change="textChanging"
        @keyup.enter="submitTextCommand"
      />
    </div>
    <div v-show="!isShowTerminal" class="redo">
      <i
        class="bi bi-arrow-clockwise"
        style="cursor: pointer"
        @click="toggleTerminalVisibility"
      >
      </i>
    </div>
  </div>
</template>

<script>
const mode = {
  clickContinue: 'clickContinue',
  buttonInput: 'buttonInput',
  textInput: 'textInput'
}

export default {
  props: {},
  data() {
    return {
      isShowTerminal: true,
      userInput: '',
      isShowProceed: false,
      terminalLinesQueue: [
        'adding Line...',
        'adding Line2...',
        'adding Line3...',
        'adding Line4...',
        'adding Line6...',
        'where if is Line5...',
        'oh found itadding Line5...',
        'adding Line7...'
      ],
      displayedTerminalLines: ['Welcome to the Terminal!'],
      mode,
      terminalMode: mode.buttonInput // clickContinue, buttonInput, textInput
    }
  },
  mounted() {
    if (this.terminalMode === mode.clickContinue) {
      this.isShowProceed = this.terminalLinesQueue.length > 0
    } else if (this.terminalMode === mode.textInput) {
      this.$nextTick(() => {
        this.focusInput()
      })
    }

    this.terminalLinesQueue.reverse()

    this.$nextTick(() => {
      this.$refs.last.scrollIntoView({ block: 'start' })
    })
  },
  methods: {
    toggleTerminalVisibility() {
      this.isShowTerminal = !this.isShowTerminal
    },
    addLineFromQueue() {
      const line = this.terminalLinesQueue.pop()
      if (line) {
        this.displayedTerminalLines.push(line)
      }

      if (this.terminalLinesQueue.length <= 0) {
        this.isShowProceed = false
      }

      this.$nextTick(() => {
        document.getElementById('last')?.scrollIntoView({ block: 'start' })
      })
    },
    addTextLine(line) {
      this.displayedTerminalLines.push(line)
    },
    focusInput() {
      if (this.terminalMode === mode.textInput) {
        this.$refs.terminalTextInput.focus()
      }
    },
    textChanging() {
      // stop the underscore from blinking for a short time.
      // this.$refs.blinkingUnderscore.classList.remove('blink')
      // setTimeout(() => {
      //   this.$refs.blinkingUnderscore.classList.add('blink')
      // }, 500)
    },
    submitTextCommand() {
      this.$refs.terminalTextInput.disabled = true
      this.addTextLine(`> ${this.userInput}`)
      this.userInput = ''

      this.$nextTick(() => {
        document.getElementById('last')?.scrollIntoView({ block: 'start' })
      })
      this.$refs.terminalTextInput.disabled = false
      this.focusInput()
    },
    optionButtonClick(event) {
      this.addTextLine(event.target.value)
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

.top {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  background-color: inherit;
  color: var(--background);
}

.center {
  background-color: var(--background);
  color: var(--primary);
  padding: 1.5em;
  user-select: none;
  overflow-y: auto;
  flex: 1;
}

#textViewport p {
  margin-bottom: 0.25em;
}

.button-region {
  margin-top: 0.5em;
}

.option-button {
  background-color: var(--primary);
  color: var(--background);
}

.redo {
  color: var(--primary);
}

.blink {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

#terminalTextInput {
  opacity: 0;
  position: absolute;
}
</style>
