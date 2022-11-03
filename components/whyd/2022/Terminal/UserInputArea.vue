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
  hybridInput: 'hybridInput',
  passwordInput: 'passwordInput',
  disabled: 'disabled'
}

export default {
  props: {},
  data() {
    return {
      mode,
      terminalMode: mode.disabled, // clickContinue, buttonInput, textInput, hybridInput, disabled
      terminalCommands: {},
      buttonData: [],
      userInput: '',
      isShowProceed: false,
      terminalLinesQueue: [
        'This line should never appear. Ff it does, Ethan fucked up probably'
      ],
      path: '/root/whyd/test', // ['root', 'whyd', 'test'],
      validPaths: new Set(['/', '/root', '/root/whyd', '/root/whyd/test'])
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
      return this.path
    },
    displayedButtons() {
      return this.buttonData.filter((name) => {
        const command = this.terminalCommands[name]
        if (command.path === undefined) {
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
    console.log(this.terminalMode)
    if (this.terminalMode === mode.clickContinue) {
      this.isShowProceed = this.terminalLinesQueue.length > 0
    } else if (
      this.terminalMode === mode.textInput ||
      this.terminalMode === mode.hybridInput
    ) {
      this.$nextTick(() => {
        this.focusInput()
        this.$emit('addTextLine', { content: this.displayedPath })
      })
    } else if (this.terminalMode === mode.passwordInput) {
      this.$nextTick(() => {
        this.focusInput()
        this.$emit('addTextLine', {
          content: 'Enter Password',
          class: 'error-text'
        })
      })
    }

    this.terminalLinesQueue.reverse()

    // console.log(this.methods)

    const paths = new Set(
      Object.values(this.terminalCommands).map((command) => command.path)
    )
    this.validPaths = paths
    console.log(this.validPaths)
  },
  methods: {
    // #region Page Control Functions
    focusInput() {
      if (
        this.terminalMode === mode.textInput ||
        this.terminalMode === mode.hybridInput ||
        this.terminalMode === mode.passwordInput
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
      const input = this.userInput
      this.$refs.terminalTextInput.disabled = true

      if (this.terminalMode === mode.passwordInput) {
        this.processPasswordInput(input)
      } else {
        this.$emit('addTextLine', { content: `> ${input}` })
        this.processCommand(input)
      }

      this.userInput = ''
      this.$refs.terminalTextInput.disabled = false
      this.scrollToBottom()
      this.focusInput()
    },
    processPasswordInput(input) {
      const censoredInput = '*'.repeat(input.length)
      this.$emit('addTextLine', {
        content: `> ${censoredInput}`,
        class: 'error-text'
      })

      if (input === 'fidlersphatass') {
        this.$emit('addTextLine', {
          content: 'Accepted',
          class: 'confirmed-text'
        })
        this.displayLogInText()
        this.terminalMode = mode.hybridInput
        this.$emit('addTextLine', { content: this.displayedPath })
      } else {
        this.$emit('addTextLine', {
          content: 'Denied',
          class: 'error-text'
        })
      }
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
          return
        }
      }
      if (processed.startsWith('cd')) {
        this.navigateTo(processed.replace('cd', '').trim())
        return
      }
      this.$emit('addTextLine', {
        content: `Error: Command not found '${processed}'`,
        class: 'error-text'
      })
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
    navigateTo(target) {
      // const arg = processed.replace('cd ', '')

      const newPath =
        target === '..'
          ? this.path.split('/').slice(0, -1).join('/')
          : this.path + '/' + target

      if (this.validPaths.has(newPath)) {
        this.path = newPath
        this.$emit('addTextLine', { content: this.displayedPath })
      } else {
        this.$emit('addTextLine', {
          content: `Error: Invalid Directory ${newPath}`,
          class: 'error-text'
        })
      }
    },
    // #endregion
    // #region Command Specific Functions
    logIn() {
      this.terminalMode = mode.hybridInput
      this.$emit('addTextLine', {
        content: 'Logging in...'
      })
      this.$emit('addTextLine', {
        content: `${this.path}/`
      })
    },
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
        class: 'italic-text'
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

.red-text {
  color: red;
}

.red-text a {
  color: red;
}
</style>
