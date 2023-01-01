<template>
  <div>
    <div v-if="server" class="container text-center pt-5">
      <Whyd2022UsernameGlitchyHeader />
      <label for="nameInput" class="form-label" />
      <div class="input-group input-group-lg">
        <input
          id="nameInput"
          v-model="name"
          class="form-control"
          list="namelist"
          placeholder="Enter your name..."
        />
        <datalist id="namelist">
          <option v-for="username in usernames" :key="username">
            {{ username }}
          </option>
        </datalist>
        <button
          class="btn btn-secondary whyd-button"
          type="button"
          :disabled="!isNameValid"
          @click="handleInputButtonPressed"
        >
          <i>whyd</i>
        </button>
      </div>

      <div v-if="shouldShowTerminalButton" class="d-flex flex-row-reverse mt-1">
        <button
          class="btn btn-outline-primary btn-sm"
          :disabled="!isNameValid"
          :title="
            isNameValid
              ? 'Head straight to the terminal!'
              : 'Enter a valid username to go to the terminal!'
          "
          @click="handleTerminalButtonPressed"
        >
          Go to terminal
        </button>
      </div>

      <div class="d-flex flex-row-reverse mt-5 mb-5">
        <button
          class="btn btn-outline-secondary btn-sm mt-5 text-end text-muted"
          @click="handleLastYearButtonPressed"
        >
          Click here for whyd 2021
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      server: undefined,
      name: '',
      shouldShowTerminalButton: false,
    }
  },
  computed: {
    isNameValid() {
      return this.usernames.includes(this.name)
    },
    usernames() {
      return Object.values(this.server.urlNamesToNames).reverse()
    },
  },
  async mounted() {
    this.server = await fetch('/whyd/2022/data/server.json').then((val) =>
      val.json(),
    )
    this.shouldShowTerminalButton =
      localStorage.getItem('hasVisitedTerminal') === 'true'
  },
  methods: {
    goToIfValidName(path, name) {
      if (this.isNameValid) {
        const userId = this.server.namesToIds[name]

        localStorage.setItem('username', name)
        localStorage.setItem('userId', userId)
        this.$router.push(path)
      }
    },
    handleInputButtonPressed() {
      this.goToIfValidName(
        `/whyd/${this.server.namesToUrlNames[this.name]}`,
        this.name,
      )
    },
    handleLastYearButtonPressed() {
      this.$router.push('/whyd/2021')
    },
    handleTerminalButtonPressed() {
      this.goToIfValidName(`/whyd/terminal`, this.name)
    },
  },
}
</script>
