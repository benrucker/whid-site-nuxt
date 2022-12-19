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
      @click="handleContinueButtonClick"
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
        @click="handleOptionButtonClick($event, button)"
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
import commandsModule from '~/components/whyd/2022/Terminal/Commands'

const commands = commandsModule.methods

const mode = {
  clickContinue: 'clickContinue',
  buttonInput: 'buttonInput',
  textInput: 'textInput',
  hybridInput: 'hybridInput',
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
      username: '#username',
      userId: '#ID',
      isShowProceed: false,
      terminalLinesQueue: [
        'This line should never appear. Ff it does, Ethan fucked up probably'
      ],
      path: '/root/whyd', // ['root', 'whyd'],
      validPaths: new Set([
        '/',
        '/root',
        '/root/whyd',
        '/root/whyd/test',
        '/root/whyd/SecBot'
      ]),
      stats: undefined,
      uniqueLineId: 0
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
        if (name.split(' ')[0] === 'cd') {
          return command.path === this.displayedPath
        }
        return (
          unlocked && !command.hasBeenRun && command.path === this.displayedPath
        )
      })
    }
  },
  async mounted() {
    // Initialize the terminal
    if (this.terminalMode === mode.clickContinue) {
      this.isShowProceed = this.terminalLinesQueue.length > 0
    } else if (
      this.terminalMode === mode.textInput ||
      this.terminalMode === mode.hybridInput
    ) {
      this.$nextTick(() => {
        this.focusInput()
        this.emitNewLine({ content: this.displayedPath })
      })
    }

    this.terminalLinesQueue.reverse()

    const paths = new Set(
      Object.values(this.terminalCommands).map((command) => command.path)
    )
    this.validPaths = paths

    // Retrive the data

    this.username = localStorage.username ?? 'fops'
    this.userId = localStorage.userId ?? '173839815400357888'

    const server = await fetch('/whyd/2022/data/server.json').then((r) =>
      r.json()
    )
    const namesToIds = server.namesToIds
    const user = await fetch(
      `/whyd/2022/data/${namesToIds[this.username]}.json`
    ).then((r) => r.json())

    this.stats = { server, user }
    this.stats.user.name = this.username
    this.stats.user.id = namesToIds[this.username]
  },
  methods: {
    emitNewLine(line) {
      this.$emit('addTextLine', {
        ...line,
        id: this.getUniqueLineId()
      })
    },
    getUniqueLineId() {
      return ++this.uniqueLineId
    },
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
      const input = this.userInput
      this.$refs.terminalTextInput.disabled = true

      this.emitNewLine({ content: `> ${input}` })
      this.processCommand(input)

      this.userInput = ''
      this.$refs.terminalTextInput.disabled = false
      this.scrollToBottom()
      this.focusInput()
    },
    handleOptionButtonClick(_, commandKey) {
      // event parameter is discarded
      this.emitNewLine({ content: `> ${commandKey}` })
      this.processCommand(commandKey)
      this.scrollToBottom()
    },
    processCommand(input) {
      const processed = input.trim() // .toLowerCase() fuck you if you try to use caps in the terminal
      const valid = Object.keys(this.terminalCommands)

      if (valid.includes(processed)) {
        this.terminalCommands[input].hasBeenRun = true
        const command = this.terminalCommands[input]
        const func = commands[command.functionName]

        if (typeof func === 'function') {
          this.executeCommandText(func(this.stats))
          return
        }
      }

      if (processed.startsWith('cd')) {
        this.navigateTo(processed.replace('cd', '').trim())
        return
      }

      if (processed === 'ls') {
        const list = Object.keys(this.terminalCommands)
          .filter((key) => this.terminalCommands[key].path === this.path)
          .join(', ')
        this.emitNewLine({
          content: `~${this.path}\n${list}\n--------------------------`
        })
        return
      }

      if (processed === 'dir') {
        this.emitNewLine({
          content: `~${this.path}`
        })
        return
      }

      this.emitNewLine({
        content: `{Error: Command not found '${processed}' | error}`
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
    handleContinueButtonClick() {
      const line = this.terminalLinesQueue.pop()
      this.emitNewLine(line)
      if (this.terminalLinesQueue.length <= 0) {
        this.isShowProceed = false
        this.terminalMode = mode.hybridInput
      }
      this.scrollToBottom()
    },
    executeCommandText(lines) {
      // takes a list of processed text lines and puts the terminal in clickContinue mode to read through them
      lines.push({ content: '{End of Command | underline}' })
      this.terminalLinesQueue = lines.reverse()
      this.terminalMode = mode.clickContinue
      this.isShowProceed = true
      this.handleContinueButtonClick()
    },
    // #endregion
    // #region Files handling Functions
    navigateTo(target) {
      const newPath =
        target === '..'
          ? this.path.split('/').slice(0, -1).join('/')
          : this.path + '/' + target

      if (this.validPaths.has(newPath)) {
        this.path = newPath
        this.emitNewLine({ content: this.displayedPath })
      } else {
        this.emitNewLine({
          content: `{Error: Invalid Directory ${newPath} | error}`
        })
      }
    },
    // #endregion
    logIn() {
      this.terminalMode = mode.hybridInput
      this.emitNewLine({
        content: `Logged in as ${this.username}`
      })
      this.emitNewLine({
        content: `${this.path}/`
      })
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
  margin-bottom: 5px;
  border-style: outset;
  border-width: 2px;
  border-color: white;
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
  color: var(--error);
}

.red-text a {
  color: var(--error);
}
</style>
