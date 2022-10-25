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
      class="blink"
      @click="continueText"
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
        'This line should never appear. Ff it does, Ethan fucked up probably'
      ],
      path: ['root', 'whyd', 'test'],
      validPaths: ['/', '/root', '/root/whyd', '/root/whyd/test']
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
    displayedPath() {
      return '/' + this.path.join('/')
    },
    displayedButtons() {
      return this.buttonData.filter((name) => {
        const command = this.terminalCommands[name]
        if (command.path === '*') {
          return true // possibly add here logic to not add cd .. to certain pages
        }
        const unlocked = this.areDependenciesMet(command.dependencies)
        return (
          unlocked && !command.hasBeenRun && command.path === this.displayedPath
        )
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
    console.log(this.methods)
    this.$emit('addTextLine', { content: this.displayedPath })
  },
  methods: {
    // #region Page Control Functions
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
    // #endregion
    // #region User Input Control Functions
    submitTextCommand() {
      // NEEDS TO BE UPDATED TO WORK WITH TERMINALCOMMANDS
      const input = this.userInput
      this.$refs.terminalTextInput.disabled = true

      this.$emit('addTextLine', { content: `> ${input}` })
      this.processCommand(input)

      this.userInput = ''
      this.$refs.terminalTextInput.disabled = false
      this.scrollToBottom()
      this.focusInput()
    },
    optionButtonClick(_, commandKey) {
      // event parameter is discarded
      // const command = this.terminalCommands[commandKey]
      this.$emit('addTextLine', { content: `> ${commandKey}` })
      this.processCommand(commandKey)
      this.scrollToBottom()
    },
    processCommand(input) {
      const processed = input.trim() // .toLowerCase() fuck you if you try to use caps in the terminal
      const valid = Object.keys(this.terminalCommands)
      if (valid.includes(processed)) {
        this.terminalCommands[input].hasBeenRun = true
        const command = this.terminalCommands[input]
        const func = this[command.functionName]
        if (typeof func === 'function') {
          func()
        }
        if (processed.startsWith('cd')) {
          // for cds from buttons
          this.navigate(processed.replace('cd ', ''))
        }
      } else if (processed.startsWith('cd')) {
        // for extra cds
        this.navigate(processed.replace('cd', '').trim())
      } else {
        this.$emit('addTextLine', {
          content: `Error: Command not found '${processed}'`,
          class: 'error-text'
        })
      }
    },
    // #endregion
    // #region hybridInput Control Functions
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
    // #endregion
    // #region clickContinue Control Functions
    continueText() {
      const line = this.terminalLinesQueue.pop()
      this.$emit('addTextLine', line)
      if (this.terminalLinesQueue.length <= 0) {
        this.isShowProceed = false
        this.terminalMode = mode.hybridInput
      }
      this.scrollToBottom()
    },
    executeCommandText(lines) {
      // takes a list of processed text lines and puts the terminal in clickContinue mode to read through them
      lines.push({ content: 'End of Command\n--------------------------' })
      this.terminalLinesQueue = lines.reverse()
      this.terminalMode = mode.clickContinue
      this.isShowProceed = true
      this.continueText()
    },
    // #endregion
    // #region Files handling Functions
    navigate(arg) {
      // const arg = processed.replace('cd ', '')
      if (arg === '..') {
        const newPath = '/' + this.path.slice(0, -1).join('/')
        if (this.validPaths.includes(newPath)) {
          this.path.pop()
          this.$emit('addTextLine', { content: this.displayedPath })
        } else {
          this.$emit('addTextLine', {
            content: 'Error: No navigable parent folder',
            class: 'error-text'
          })
        }
      } else {
        const newPath = this.displayedPath + '/' + arg
        console.log(newPath)
        if (this.validPaths.includes(newPath)) {
          this.path.push(arg)
          this.$emit('addTextLine', { content: this.displayedPath })
        } else {
          this.$emit('addTextLine', {
            content: `Error: Invalid Directory ${newPath}`,
            class: 'error-text'
          })
        }
      }
    },
    // #endregion
    // #region Command Specific Functions
    sampleFunction() {
      // example command
      const val1 = 85 // presumably load this from data
      const val1Response =
        val1 > 50
          ? `Don't you think that's a little excessive?`
          : `You gotta pump those numbers up`

      const testLines = [
        { content: 'Test line 1' },
        { content: `you were a dick to trent ${val1} times` },
        { content: val1Response }
      ]

      this.executeCommandText(testLines)
    },
    testFunction() {
      this.$emit('addTextLine', {
        content: 'test command invoked',
        class: 'error-text'
      })
    }
    // #endregion
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
