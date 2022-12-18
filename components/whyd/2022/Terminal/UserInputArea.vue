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
      stats: undefined
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
        this.$emit('addTextLine', { content: this.displayedPath })
      })
    }

    this.terminalLinesQueue.reverse()

    const paths = new Set(
      Object.values(this.terminalCommands).map((command) => command.path)
    )
    this.validPaths = paths

    // Retrive the data

    this.username = localStorage.username ?? '#USERNAME'
    this.userId = localStorage.userId ?? '1234'

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

    console.log(this.stats.user)
    console.log(this.stats.server)
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
        this.$emit('addTextLine', {
          content: `~${this.path}\n${list}\n--------------------------`
        })
        return
      }
      if (processed === 'dir') {
        this.$emit('addTextLine', {
          content: `~${this.path}`
        })
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
      lines.push({ content: 'End of Command', class: 'underlined-text' })
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
        content: `Logged in as ${this.username}`
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
    },
    helpTerminalFunction() {
      const lines = [
        {
          content: 'whydOS v1.2 Database Terminal Interface',
          class: 'underlined-text'
        },
        {
          content: `Commands can be executed by typing them in or by clicking the SmartButtons (patent pending) that are tuned to present the data optimized for your analytical experience.`
        },
        {
          content: `Directory of general System commands v.1`,
          class: `underlined-text`
        },
        {
          content: `'ls' - List executables in current directory\n'cd ..' - Navigate one directory up\n'cd [folder]' - Navigate to [folder]\n'dir' - Display working directory `
        },
        {
          content:
            'NOTICE: The Information accessible is highly sensitive and should not be published.',
          class: 'error-text'
        },
        { content: 'In the case of Security Breach...', class: 'error-text' },
        {
          content: '[TODO: Security Breach Contingency Plan]',
          class: 'error-text'
        }
      ]
      this.executeCommandText(lines)
    },
    SecBotDMsFunction() {
      const numWalter = 5
      const differentWalterUsers = 3

      const lines = [
        {
          content: '@secuityBot4891#1995 Direct Message logs...\n',
          class: 'underlined-text'
        },
        {
          content: `This image was sent [${numWalter}] times by [${differentWalterUsers}] users.`,
          type: 'image',
          url: 'https://media.tenor.com/S_to1tY3ixUAAAAd/breaking-bad-walter-white.gif'
        }
      ]

      this.executeCommandText(lines)
    },
    SecBotVoiceEventsFunction() {
      const user = this.username

      // let VECountTotal = 55
      const VECountTotal = Object.values(
        this.stats.server['SecBot voice event type_counts']
      ).reduce((accumulator, currentValue) => accumulator + currentValue)

      const VECountUser = Object.values(
        this.stats.user['SecBot voice event type counts']
      ).reduce((accumulator, currentValue) => accumulator + currentValue)
      const VECountMax = 55 // count for most active user
      const maxUser = '#MAX' // display name for most active user

      const lines = [
        {
          content: `SecurityBot observed ${VECountTotal} 'Voice Events' from it's initialization to the end of the year.`
        },
        {
          content: `Voice Events include joining, leaving, moving channels as well as muting, deafening, turning on webcam as well as their opposites.`
        }
      ]

      if (VECountUser === VECountMax) {
        lines.push({
          content: `User ${maxUser} had the highest Voice Event count with ${VECountUser}!`
        })
      } else {
        lines.push({
          content: `User ${user} had a Voice Event count of ${VECountUser} compared to ${maxUser} with the highest count of ${VECountMax}!`
        })
      }

      // add top 5 list either as addition to this one or another command that displays afterwards.
      this.executeCommandText(lines)
    },
    SecBotVoiceEventsMostActiveDayFunction() {
      const user = this.username
      const MADUser = this.stats.user['SecBot most active voice event days'] // mostActiveDay and numEvents
      // Date.today().toString("MMMM dS, yyyy") // "April 12th, 2008"
      const date = new Date(MADUser.mostActiveDay)
      const MADUserDate = date.toLocaleDateString('en-US', {
        dateStyle: 'long'
      })
      const MADServerDate = '#DATE'
      const MADServerNum = 55

      const lines = [
        {
          content: `Most Active days by Voice Event count`,
          class: 'underlined-text'
        },
        {
          content: `${user} was most active on ${MADUserDate} with ${MADUser.numEvents} unique events.`
        },
        {
          content: `The server's most active day overall was ${MADServerDate} with ${MADServerNum} unique recorded events...`
        },
        {
          content:
            'SecurityBot did not note any outstanding events occurring [then]... Additional analysis required.'
        }
      ]

      this.executeCommandText(lines)
    },
    SecBotVoiceEventsFavoriteVoiceChannelFunction() {
      // very subject to change when data relating to actual time in VCs is computed;
      // compare number of joins and total time spent in a channel
      const user = this.username
      const joinsTotal = Math.trunc(
        this.stats.user['SecBot voice event type counts'].join
      )
      const favoriteChannelName = '#CHANNEL'
      const favoriteChannelJoins = 55

      const lines = [
        { content: `Favorite Voice Channel`, class: 'underlined-text' },
        { content: `${user} joined voice channels ${joinsTotal} times.` },
        {
          content: `${user}'s favorite channel was ${favoriteChannelName} which they joined ${favoriteChannelJoins} times.`
        }
      ]

      this.executeCommandText(lines)
    },
    SecBotVoiceEventsMutesFunction() {
      const vec = this.stats.user['SecBot voice event type counts']
      const user = this.username
      const selfMutes = Math.trunc(vec.mute)
      const serverMutes = Math.trunc(vec['server mute'])

      const lines = [
        { content: `Mutes`, class: 'underlined-text' },
        { content: `${user} muted themselves ${selfMutes} times.` }
      ]

      if (serverMutes > 0) {
        lines.push({
          content: `Additionally, ${user} was server muted ${serverMutes} times.\n Shameful. Or not. There is no context.`
        })
      } else {
        lines.push({
          content: `Additionally, ${user} avoided being server muted according to records.`
        })
      }
      this.executeCommandText(lines)
    },
    SecBotScores() {
      const user = this.username
      const firstEpochScore = 55 // this.stats.user[""]
      const finalScore = this.stats.user['SecBot user final score'].score

      const lines = [
        { content: 'SecurityBot Scores', class: 'underlined-text' },
        {
          content:
            'On April 1st, 2022 every user was generously given 750 social credit points.'
        },
        {
          content: `By the end of the first scoring period, ${user} had a score of ${firstEpochScore}.`
        },
        {
          content: `As of the final grading period of the year, ${user} had a score of ${finalScore}.`
        }
      ]

      if (firstEpochScore > finalScore) {
        lines.push({ content: `[Negative Remark]` })
      } else {
        lines.push({ content: `[Positive Remark]` })
      }

      this.executeCommandText(lines)
    },
    SecBotScoresHigh() {
      const user = this.username
      const userHighScore = this.stats.user['SecBot user max score'].score
      const serverHigh = this.stats.server['SecBot server high score']
      const serverHighScore = serverHigh.score
      const serverHighScoreUser =
        this.stats.server.idsToNames[serverHigh.member_id]

      const lines = [
        { content: 'High Score', class: 'underlined-text' },
        { content: `${user} had a high score of ${userHighScore}` }
      ]

      if (userHighScore === serverHighScore) {
        lines.push({
          content: `Looks like this was the highest score recorded of all users! Please contact the majors to claim a voucher that can be redeemed for one (1) sound to be added to JermaBot!\nPlease continue to be agreeable into the new year.`
        })
      } else {
        lines.push({
          content: `Compared to the apex score of ${serverHighScore} achived by ${serverHighScoreUser}, their score can be improved. They should consider improving their agreeability in the new year.`
        })
      }

      this.executeCommandText(lines)
    },
    SecBotScoresLow() {
      const user = this.username
      const userLowScore = this.stats.user['SecBot user min score'].score
      const serverLow = this.stats.server['SecBot server low score']
      const serverLowScore = serverLow.score
      const serverLowScoreUser =
        this.stats.server.idsToNames[serverLow.member_id]

      const lines = [
        { content: `Low Score`, class: 'underlined-text' },
        { content: `${user}'s lowest score was ${userLowScore}.` }
      ]

      if (userLowScore === 750) {
        lines.push({
          content: `If the records are correct, ${user}'d score never dropped below their starting value, this behavior does not go unnoticed.'`
        })
      }

      if (userLowScore === serverLowScore) {
        lines.push({
          content: `Incidently, this was the lowest score recorded since SecurityBot's inception on 4/1/22. The associated behavior that resulted in this score has hopefully been corrected.`
        })
      } else {
        lines.push({
          content: `Even this score can be made to look impressive compared to the lowest recorded score of ${serverLowScore} by ${serverLowScoreUser}.`
        })
      }
      this.executeCommandText(lines)
    },
    SecBotScoresAverage() {
      const user = this.username
      const userAverage = this.stats.user['SecBot user average score'].score
      const serverAverage = 55 // this.stats.server['']

      const lines = [
        { content: `Average Scores`, class: 'underlined-text' },
        {
          content: `The average score of the entire server over the year was ${serverAverage}`
        }
      ]

      if (userAverage >= serverAverage) {
        lines.push({
          content: `${user}'s average score of ${userAverage}, on average, was higher on average than the average, on average.`
        })
      } else {
        lines.push({
          content: `${user}'s average score of ${userAverage}, on average left a lot to be desired, on average.`
        })
      }

      this.executeCommandText(lines)
    },
    MetaSecBotDevelopment() {
      // describe how the scoring worked? including the initial method and how it was changed to be wackier after a few weeks while ben was drunk? (cheeto cheeto)
      // include how scores loop around from 1600
      // at 7am on april 1st Ethan and Ben met up to make sure that it worked, and it didnt so we needed to manually activate it.
      // creation of Dennis
      // CUMPEG
      // format all of these like they are chat logs between Ben and Ethan?
      // have some corrupted / jumbled text
      // folder title: subpoena documents, backups,
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
  margin-bottom: 5px;
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
