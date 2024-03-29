<template>
  <div id="last" ref="last" class="mb-0">
    <span
      v-if="
        terminalMode === mode.textInput || terminalMode === mode.hybridInput
      "
      id="userInputDisplay"
      >> {{ userInput }}<a ref="blinkingUnderscore" class="blink">_</a></span
    >
    <span
      v-if="isShowProceed && terminalMode === mode.clickContinue"
      style="cursor: pointer"
      @click="handleContinueButtonClick"
    >
      >
      <span class="blink" style="text-decoration: underline"
        >Click to continue</span
      >
    </span>
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
        :class="terminalCommands[button].buttonStyle ?? ''"
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
      @keyup.enter="handleTextInputEnter"
      @keyup.up="handleTextInputUpArrow"
      @keyup.down="handleTextInputDownArrow"
      @blur="justFocusInput"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import commandsModule from '~/components/whyd/2022/Terminal/Commands'

const commands = commandsModule.methods

const mode = {
  clickContinue: 'clickContinue',
  buttonInput: 'buttonInput',
  textInput: 'textInput',
  hybridInput: 'hybridInput',
  disabled: 'disabled',
}

const textInputModes = [mode.textInput, mode.hybridInput]

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
        'This line should never appear. Ff it does, Ethan fucked up probably',
      ],
      path: '/root/whyd', // ['root', 'whyd'],
      validPaths: new Set([
        '/',
        '/root',
        '/root/bdr',
        '/root/ecf',
        '/root/twcm',
        '/root/whyd',
        '/root/whyd/test',
        '/root/whyd/SecBot',
        '/root/whyd/SecBot/voice',
        '/root/whyd/Leftovers', // needs button
        '/root/dont_backups', // needs button
      ]),
      stats: undefined,
      uniqueLineId: 0,
      usedCommands: {},
      commandHistory: [],
      commandHistoryPosition: 0,
      currentUserInput: undefined,
    }
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
    },
    isTextInputModeActive() {
      return textInputModes.includes(this.terminalMode)
    },
    validCommands() {
      const commandsInDirectory = Object.entries(this.terminalCommands).flatMap(
        ([commandName, command]) => {
          if (command.path === this.path) {
            return [commandName, command.prettyName]
          } else {
            return []
          }
        },
      )
      return new Set(commandsInDirectory)
    },
  },
  watch: {
    terminalMode(mode) {
      if (textInputModes.includes(mode)) {
        this.$refs.terminalTextInput.focus()
      }
    },
  },
  async mounted() {
    await this.initialize()
  },
  methods: {
    async initialize() {
      this.terminalCommands = await fetch(
        `/whyd/2022/terminal/terminalCommands.json`,
      ).then((r) => r.json())

      for (const commandName in this.terminalCommands) {
        if (typeof this.terminalCommands[commandName] !== 'object') {
          delete this.terminalCommands[commandName]
          continue
        }
        Vue.set(this.terminalCommands[commandName], 'hasBeenRun', false)
      }
      const { buttons } = await fetch(
        `/whyd/2022/terminal/terminalButtonData.json`,
      ).then((r) => r.json())
      this.buttonData = buttons

      // Initialize the terminal
      this.$nextTick(() => {
        this.focusInput()
        this.emitNewLine({ content: this.displayedPath })
      })

      this.terminalLinesQueue.reverse()

      const paths = new Set(
        Object.values(this.terminalCommands).map((command) => command.path),
      )
      this.validPaths = paths

      this.usedCommands =
        JSON.parse(localStorage.getItem('whyd22.usedCommands')) ?? {}
      this.username = localStorage.getItem('username') ?? 'fops'
      this.userId = localStorage.getItem('userId') ?? '173839815400357888'

      console.log(this.usedCommands)
      for (const command of this.usedCommands[this.userId] ?? []) {
        if (this.terminalCommands[command] != null)
          Vue.set(this.terminalCommands[command], 'hasBeenRun', true)
      }

      // Retrive the data
      const server = await fetch('/whyd/2022/data/server.json').then((r) =>
        r.json(),
      )
      const namesToIds = server.namesToIds
      const user = await fetch(
        `/whyd/2022/data/${namesToIds[this.username]}.json`,
      ).then((r) => r.json())

      this.stats = { server, user }
      this.stats.user.name = this.username
      this.stats.user.id = namesToIds[this.username]
    },
    emitNewLine(line) {
      this.$emit('addTextLine', {
        ...line,
        id: this.getUniqueLineId(),
      })
    },
    getUniqueLineId() {
      return ++this.uniqueLineId
    },
    getTerminalMode() {
      return this.terminalMode
    },
    // #region Page Control Functions
    focusInput(proceed = true) {
      if (
        this.terminalMode === mode.textInput ||
        this.terminalMode === mode.hybridInput
      ) {
        this.justFocusInput()
      } else if (
        proceed &&
        this.isShowProceed &&
        this.terminalMode === mode.clickContinue
      ) {
        this.handleContinueButtonClick()
      }
    },
    justFocusInput() {
      this.$refs.terminalTextInput?.focus()
    },
    scrollToBottom() {
      this.$emit('scrollToBottom')
    },
    selfDestruct() {
      this.$emit('selfDestruct')
    },
    // #endregion
    // #region User Input Control Functions
    submitTextCommand() {
      if (this.terminalMode === mode.clickContinue) {
        return
      }

      const input = this.userInput
      this.$refs.terminalTextInput.disabled = true

      this.emitNewLine({ content: `{> ${input} | tall}` })
      this.processCommand(input)

      this.userInput = ''
      this.$refs.terminalTextInput.disabled = false
      this.scrollToBottom()
      this.focusInput(false)
    },
    handleOptionButtonClick(event, commandKey) {
      event.stopImmediatePropagation()

      this.emitNewLine({ content: `{> ${commandKey} | tall}` })
      this.processCommand(commandKey)
      this.scrollToBottom()
      this.focusInput(false)
    },
    handleTextInputEnter() {
      if (textInputModes.includes(this.terminalMode)) {
        this.submitTextCommand()
        this.justFocusInput()
      } else if (this.terminalMode === mode.clickContinue) {
        this.handleContinueButtonClick()
      }
    },
    handleTextInputUpArrow() {
      if (this.commandHistoryPosition === this.commandHistory.length) {
        this.currentUserInput = this.userInput
      }

      this.commandHistoryPosition = Math.max(0, this.commandHistoryPosition - 1)
      this.userInput = this.commandHistory[this.commandHistoryPosition]
    },
    handleTextInputDownArrow() {
      this.commandHistoryPosition = Math.min(
        this.commandHistory.length,
        this.commandHistoryPosition + 1,
      )

      if (this.commandHistoryPosition === this.commandHistory.length) {
        this.userInput = this.currentUserInput
      } else {
        this.userInput = this.commandHistory[this.commandHistoryPosition]
      }
    },
    processCommand(input) {
      const commandName = input.trim().toLowerCase() // fuck you if you make the terminal case-sensitive

      if (this.isCommandValid(commandName)) {
        const { command, commandName: correctCommandName } =
          this.getCommand(commandName)

        if (command == null) {
          throw new Error(
            'Illegal state: command is valid but not found in commands list',
          )
        }

        this.markCommandAsUsed(command, correctCommandName)

        const func = commands[command.functionName]

        if (typeof func === 'function') {
          this.addToCommandHistory(commandName)
          this.executeCommandText(func(this.stats))
          return
        }
      }

      if (commandName.startsWith('cd')) {
        this.navigateTo(commandName.replace('cd', '').trim())
        this.addToCommandHistory(commandName)
        return
      }

      if (commandName === 'ls') {
        const list = Object.keys(this.terminalCommands)
          .filter(
            (key) =>
              this.terminalCommands[key].path === this.path &&
              key !== 'BONUS.log',
          )
          .join(', ')
        this.emitNewLine({
          content: `{Current Directory | underline}\n~${this.path}\n{Availible Executables | underline}\n${list}\n`,
          block: true,
        })
        this.addToCommandHistory(commandName)
        return
      }

      if (commandName === 'dir') {
        this.emitNewLine({
          content: `~${this.path}`,
        })
        this.addToCommandHistory(commandName)
        return
      }

      if (commandName === 'delete system31' && this.path === '/root') {
        this.DeleteSystem31Function()
        this.addToCommandHistory(commandName)
        return
      }

      this.addToCommandHistory(commandName)
      this.emitNewLine({
        content: `{Error: Command not found '${commandName}' | error}`,
      })
    },
    isCommandValid(commandName) {
      return this.validCommands.some(
        (validCommand) => validCommand.toLowerCase() === commandName,
      )
    },
    getCommand(commandName) {
      for (const [realCommandName, command] of Object.entries(
        this.terminalCommands,
      )) {
        if (
          realCommandName.toLowerCase() === commandName ||
          command.prettyName.toLowerCase() === commandName
        ) {
          return {
            command,
            commandName: realCommandName,
          }
        }
      }

      return {
        command: undefined,
        commandName: undefined,
      }
    },
    addToCommandHistory(commandName) {
      this.commandHistory.push(commandName)
      this.commandHistoryPosition = this.commandHistory.length
      this.currentUserInput = ''
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
      if (this.terminalLinesQueue.length <= 0) {
        this.isShowProceed = false
        this.terminalMode = mode.hybridInput
        this.scrollToBottom()
        return
      }

      const line = this.terminalLinesQueue.pop()
      this.emitNewLine(line)

      this.scrollToBottom()
    },
    executeCommandText(lines) {
      // takes a list of processed text lines and puts the terminal in clickContinue mode to read through them
      // lines.push({ content: '{End of Command | underline}' })
      this.terminalLinesQueue = lines.reverse()

      lines[0].lastLineInCommand = true

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

      const destination = Array.from(this.validPaths).find(
        (maybeDestination) => {
          return maybeDestination?.toLowerCase() === newPath.toLowerCase()
        },
      )

      if (destination) {
        this.path = destination
        this.emitNewLine({ content: this.displayedPath })
      } else {
        this.emitNewLine({
          content: `{Error: Invalid Directory ${newPath} | error}`,
        })
      }
    },
    // #endregion
    logIn() {
      this.terminalMode = mode.hybridInput
      this.emitNewLine({
        content: `Logged in as ${this.username}`,
      })
      this.emitNewLine({
        content: `${this.path}/`,
      })
      this.focusInput()
    },
    markCommandAsUsed(command, commandName) {
      Vue.set(command, 'hasBeenRun', true)

      if (this.usedCommands[this.userId] == null) {
        this.usedCommands[this.userId] = [commandName]
      } else {
        this.usedCommands[this.userId] = Array.from(
          new Set(this.usedCommands[this.userId].concat([commandName])),
        )
      }

      localStorage.setItem(
        'whyd22.usedCommands',
        JSON.stringify(this.usedCommands),
      )
    },
    setCommandsUnused() {
      this.usedCommands = {}

      for (const command in Object.keys(this.terminalCommands)) {
        if (typeof this.terminalCommands[command] !== 'object') {
          // delete this.terminalCommands[commandName]
          continue
        }
        Vue.set(this.terminalCommands[command], 'hasBeenRun', false)
      }

      localStorage.removeItem('whyd22.usedCommands')
    },
    DeleteSystem31Function() {
      this.terminalMode = mode.disabled
      this.setCommandsUnused()
      this.emitNewLine({
        content: `{DELETING SYSTEM 31... | error bold underline}`,
      })
      setTimeout(() => {
        this.emitNewLine({
          content: `{Complete 🙂 | success} `,
        })
      }, 1000)
      setTimeout(() => {
        this.selfDestruct()
        // location.reload()
      }, 1500)
      setTimeout(() => {
        location.reload()
      }, 1950)
    },
  },
}
</script>

<style scoped>
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
  border: outset 2px rgba(255, 255, 255, 0.75);
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
  top: -100vh;
  left: -100vw;
}

.system-button {
  background-color: hsl(212, 15%, 68%);
  border: outset 2px hsl(212, 45%, 85%);
}

.nav-button {
  background-color: hsl(22, 30%, 68%);
  border: outset 2px hsl(22, 45%, 85%);
}

.danger-button {
  background-color: hsl(350, 30%, 68%);
  border: outset 2px hsl(350, 45%, 85%);
}

.whyd-button {
  background: linear-gradient(
    63deg,
    hsl(186, 28%, 85%),
    hsl(35, 28%, 85%),
    hsl(335, 28%, 85%),
    hsl(256, 28%, 85%)
  );
  border: outset 2px hsl(350, 0%, 95%);
}

.ethan-button {
  background-color: hsl(186, 29%, 80%);
}

.ben-button {
  background-color: hsl(31, 48%, 71%);
}

.tristan-button {
  background-color: hsl(335, 30%, 85%);
}

.wyatt-button {
  background-color: hsl(256, 30%, 85%);
}
</style>
