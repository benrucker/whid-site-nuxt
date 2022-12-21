<template>
  <div class="center pass-view" @click="focusPasswordInput">
    <div v-if="correctPassword" class="login-graphic">
      <Whyd2022Terminal3DWhid
        class="chart3d"
        :should-stop-when-facing-forward="stopLogo"
      />
      <p class="correct">{{ promptText }}</p>
    </div>
    <div
      v-if="!correctPassword"
      class="text-area"
      :class="correctPassword ? 'correct' : 'incorrect'"
    >
      <p id="passwordPromptText" class="mb-0 text-nowrap">{{ promptText }}</p>

      <span id="userPasswordInputDisplay" class="text-nowrap">{{
        '> ' + '*'.repeat(userPasswordInput.length)
      }}</span
      ><a class="blink">_</a>
    </div>
    <input
      id="passwordTextInput"
      ref="passwordTextInput"
      v-model="userPasswordInput"
      type="text"
      @keyup.enter="submitPasswordAttempt"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userPasswordInput: '',
      promptText: 'Enter Password',
      correctPassword: false,
      validPasswords: ['fidlersphatass', 'f'],
      attempts: 0,
      locked: false,
      // loggingIn: false,
      stopLogo: false
    }
  },
  mounted() {
    this.focusPasswordInput()
  },
  methods: {
    focusPasswordInput() {
      this.$refs.passwordTextInput.focus()
    },
    submitPasswordAttempt() {
      this.attempts++
      const inputText = this.userPasswordInput
      this.$refs.passwordTextInput.disabled = true
      if (this.validPasswords.includes(inputText)) {
        this.correctPassword = true
        this.showLoggingIn()
      } else if (this.attempts === 3) {
        this.promptText = 'Too many attempts - Locking terminal...'
        this.locked = true
        setTimeout(() => {
          this.promptText = '(Just Kidding)'
          this.locked = false
          this.$refs.passwordTextInput.disabled = false
        }, 5000)
      } else if (this.attempts > 1) {
        this.promptText = `Incorrect (${this.attempts})`
      } else {
        this.promptText = 'Incorrect'
      }

      this.userPasswordInput = ''
      if (!this.locked) {
        this.$refs.passwordTextInput.disabled = this.locked
      }
    },
    showLoggingIn() {
      this.promptText = 'Logging in...'
      this.loggingIn = true
      setTimeout(() => {
        this.promptText = 'Compiling SecuityBot data...'
      }, 1500)
      setTimeout(() => {
        this.promptText = 'Proofreading username...'
      }, 2000)
      setTimeout(() => {
        this.promptText = 'Triangulating your location...'
      }, 2500)
      setTimeout(() => {
        this.promptText = 'Counting cheetos...'
      }, 3000)
      setTimeout(() => {
        this.promptText = 'Scoring users...'
      }, 3500)
      setTimeout(() => {
        this.promptText = 'Performing Complex Calculations...'
      }, 4000)
      setTimeout(() => {
        this.promptText = 'Emailing Dennis...'
      }, 4500)
      setTimeout(() => {
        this.promptText = 'Looking at the graphic...'
      }, 5000)
      setTimeout(() => {
        this.stopLogo = true
      }, 6000)
      setTimeout(() => {
        this.$emit('logIn')
        // }, 120) // give .05 seconds
      }, 12000) // give 5 seconds
    }
  }
}
</script>

<style>
.pass-view {
  position: absolute;
  top: 1.75em;
  width: 99%;
  height: 92%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.login-graphic {
  position: absolute;
  height: 55%;
  width: 60%;
  background-color: inherit;
  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-area {
  width: 25%;
}

.incorrect {
  color: var(--error);
}

.incorrect a {
  color: var(--error);
}

.correct {
  color: var(--success);
}

.correct a {
  color: var(--success);
}

#passwordTextInput {
  opacity: 0;
  position: absolute;
}

.blink {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
