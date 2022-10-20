<template>
  <div>
    <div v-show="isShowTerminal" class="outer" @click="focusInput">
      <div class="top">
        <strong>whydOS</strong>
        <div class="top-buttons">
          <!-- <i style="cursor: pointer" @click="toggleButtons">btn</i> -->
          <i
            class="bi bi-x"
            style="cursor: pointer"
            @click="toggleTerminalVisibility"
            >x</i
          >
        </div>
      </div>
      <div id="textViewport" class="center">
        <p v-for="(line, index) in displayedTerminalLines" :key="index">
          {{ line }}
        </p>
        <div id="last" ref="last" class="mb-0">
          >
          <span
            v-if="
              terminalMode === mode.textInput ||
              terminalMode === mode.hybridInput
            "
            id="userInputDisplay"
            >{{ userInput }}</span
          ><a ref="blinkingUnderscore" class="blink">_</a><br />
          <a
            v-if="isShowProceed && terminalMode === mode.clickContinue"
            style="cursor: pointer"
            @click="addLine"
          >
            Click to continue
          </a>
          <div
            v-show="
              terminalMode === mode.buttonInput ||
              terminalMode === mode.hybridInput
            "
            ref="buttonRegion"
            class="button-region"
          >
            <!-- <button
              v-for="button in displayedButtons"
              :key="button.value"
              type="button"
              class="option-button"
              :value="button.value"
              @click="optionButtonClick($event)"
            >
              {{ button.text }}
            </button> -->
            <button
              v-for="button of displayedButtons"
              :key="button"
              type="button"
              class="option-button"
              :value="button"
              @click="optionButtonClick($event, button)"
            >
              {{ terminalCommands[button].prettyName }}
            </button>
          </div>
        </div>
      </div>
      <input
        id="terminalTextInput"
        ref="terminalTextInput"
        v-model="userInput"
        type="text"
        @keyup.enter="submitTextCommand"
      />
    </div>
    <!-- <div v-show="!isShowTerminal" class="redo">
      <i
        class="bi bi-arrow-clockwise"
        style="cursor: pointer"
        @click="toggleTerminalVisibility"
      >
      </i>
    </div> -->
  </div>
</template>

<script>
const mode = {
  clickContinue: 'clickContinue',
  buttonInput: 'buttonInput',
  textInput: 'textInput',
  hybridInput: 'hybridInput'
}

export default {
  props: {},
  data() {
    return {
      isShowTerminal: true,
      userInput: '',
      isShowProceed: false,
      terminalLinesQueue: [
        'adding Line2...',
        'adding Line3...',
        'adding Line4...',
        'adding Line6...',
        'where if is Line5...',
        'oh found itadding Line5...',
        'adding Line7...'
      ],
      // buttonsQueue: [
      //   // add a bool that represents whether its been tried or not yet.
      //   { value: '1', text: 'one' },
      //   { value: '2', text: 'two' },
      //   { value: '3', text: 'three' },
      //   { value: '4', text: 'four' },
      //   { value: '5', text: 'five' },
      //   { value: '6', text: 'six' },
      //   { value: '7', text: 'seven' }
      // ],
      terminalCommands: {},
      buttonData: [],
      displayedTerminalLines: ['C:/whid.live/whyd/22/username.exe'],
      mode,
      terminalMode: mode.hybridInput // clickContinue, buttonInput, textInput, hybridInput
    }
  },
  async fetch() {
    this.terminalCommands = await this.$nuxt
      .$content('terminalCommands')
      .fetch()

    for (const commandName in this.terminalCommands) {
      if (typeof this.terminalCommands[commandName] !== 'object') {
        delete this.terminalCommands[commandName]
        continue
      }

      this.terminalCommands[commandName].hasBeenRun = false
      // this.terminalCommands[commandName].display = true
    }
    // this.terminalCommands['4'].display = false

    this.buttonData = (
      await this.$nuxt.$content('terminalButtonData').fetch()
    ).buttons
  },
  computed: {
    displayedButtons() {
      // is this the ground-truth for displaying buttons?
      // even for buttons that appear in an interaction tree?
      // i.e. click "Nerd" -> user is presented with "Yes" and "No" buttons -> click to continue mode

      return this.buttonData.filter((name) => {
        const command = this.terminalCommands[name]

        const unlocked = this.areDependenciesMet(command.dependencies)

        return unlocked && !command.hasBeenRun
      })
    }
  },
  mounted() {
    if (this.terminalMode === mode.clickContinue) {
      this.isShowProceed = this.terminalLinesQueue.length > 0
    } else if (
      this.terminalMode === mode.textInput ||
      this.terminalMode === mode.hybridInput
    ) {
      this.$nextTick(() => {
        this.focusInput()
      })
    }

    this.terminalLinesQueue.reverse()
    // this.buttonsQueue.reverse()

    this.scrollToBottom()
  },
  methods: {
    toggleTerminalVisibility() {
      // this.isShowTerminal = !this.isShowTerminal
      alert('The Terminal cannot be closed at this time.')
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
      if (
        this.terminalMode === mode.textInput ||
        this.terminalMode === mode.hybridInput
      ) {
        this.$refs.terminalTextInput.focus()
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.last.scrollIntoView({ block: 'start' })
      })
    },
    submitTextCommand() {
      // NEEDS TO BE UPDATED TO WORK WITH TERMINALCOMMANDS
      this.$refs.terminalTextInput.disabled = true
      this.addTextLine(`> ${this.userInput}`)
      this.userInput = ''

      this.scrollToBottom()
      this.$refs.terminalTextInput.disabled = false
      this.focusInput()
    },
    optionButtonClick(_, commandKey) {
      // set this.executing = true

      // event parameter is discarded
      const command = this.terminalCommands[commandKey]
      this.addTextLine(`> ${commandKey}`)
      this.terminalCommands[commandKey].hasBeenRun = true

      const func = this[command.functionName]
      if (typeof func === 'function') {
        func()
      }

      this.scrollToBottom()
    },
    toggleButtons() {
      if (
        this.terminalMode === mode.buttonInput ||
        this.terminalMode === mode.hybridInput
      ) {
        this.terminalMode = mode.textInput
      } else {
        this.terminalMode = mode.hybridInput
        this.scrollToBottom()
      }
    },
    areDependenciesMet(dependencies) {
      if (!dependencies) {
        return true
      }

      for (const dependency of dependencies) {
        if (!this.terminalCommands[dependency].hasBeenRun) {
          return false
        }
      }

      return true
    },
    testFunction() {
      console.log('one')
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
  margin-right: 5px;
}

.redo {
  color: var(--primary);
  width: 50px;
  height: 50px;
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
