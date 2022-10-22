<template>
  <div id="last" ref="last" class="mb-0">
    >
    <span
      v-if="
        terminalMode === mode.textInput || terminalMode === mode.hybridInput
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
        terminalMode === mode.buttonInput || terminalMode === mode.hybridInput
      "
      ref="buttonRegion"
      class="button-region"
    >
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
    <input
      id="terminalTextInput"
      ref="terminalTextInput"
      v-model="userInput"
      type="text"
      @keyup.enter="submitTextCommand"
    />
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
      mode,
      terminalMode: mode.hybridInput, // clickContinue, buttonInput, textInput, hybridInput
      terminalCommands: {},
      buttonData: [],
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
      ]
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
    }
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
  },
  methods: {
    // addLineFromQueue() {
    //   const line = this.terminalLinesQueue.pop()
    //   if (line) {
    //     this.displayedTerminalLines.push(line)
    //   }
    //   if (this.terminalLinesQueue.length <= 0) {
    //     this.isShowProceed = false
    //   }
    //   this.$nextTick(() => {
    //     document.getElementById('last')?.scrollIntoView({ block: 'start' })
    //   })
    // },
    focusInput() {
      if (
        this.terminalMode === mode.textInput ||
        this.terminalMode === mode.hybridInput
      ) {
        this.$refs.terminalTextInput.focus()
      }
    },
    scrollToBottom() {
      this.$emit('scrollToBottom')
    },
    submitTextCommand() {
      // NEEDS TO BE UPDATED TO WORK WITH TERMINALCOMMANDS
      this.$refs.terminalTextInput.disabled = true
      // this.addTextLine(`> ${this.userInput}`)
      this.$emit('addTextLine', `> ${this.userInput}`)
      this.userInput = ''
      this.scrollToBottom()
      this.$refs.terminalTextInput.disabled = false
      this.focusInput()
    },
    optionButtonClick(_, commandKey) {
      // set this.executing = true
      // event parameter is discarded
      const command = this.terminalCommands[commandKey]
      // this.addTextLine(`> ${commandKey}`)
      this.$emit('addTextLine', `> ${commandKey}`)
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
.button-region {
  margin-top: 0.5em;
}

.option-button {
  background-color: var(--primary);
  color: var(--background);
  margin-right: 5px;
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
