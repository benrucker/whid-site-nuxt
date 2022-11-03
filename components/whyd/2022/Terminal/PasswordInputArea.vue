<template>
  <div class="center pass-view" @click="focusPasswordInput">
    <div class="text-area" :class="correctPassword ? 'correct' : 'incorrect'">
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
      password: 'fidlersphatass',
      attempts: 0,
      locked: false
    }
  },
  methods: {
    focusPasswordInput() {
      this.$refs.passwordTextInput.focus()
    },
    submitPasswordAttempt() {
      this.attempts++
      const inputText = this.userPasswordInput
      this.$refs.passwordTextInput.disabled = true
      if (inputText === this.password) {
        this.correctPassword = true
        this.promptText = 'Correct - Logging in'
        setTimeout(() => {
          this.$emit('logIn')
        }, 2000)
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
        this.$refs.passwordTextInput.disabled = false
      }
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

.text-area {
  width: 25%;
}

.incorrect {
  color: red;
}

.incorrect a {
  color: red;
}

.correct {
  color: lime;
}

.correct a {
  color: lime;
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
