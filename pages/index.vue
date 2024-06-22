<template>
  <div class="container-fluid layout">
    <div v-if="server" class="container text-center layout2 pb-5">
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

      <div
        v-if="shouldShowTerminalButton"
        class="d-flex flex-row-reverse mt-1 w-100"
      >
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
    </div>
    <div v-if="server" class="hidden-links">
      <div v-for="username in usernames" :key="username">
        <NuxtLink :to="`/${server?.namesToUrlNames[username]}`">{{
          `/${server?.namesToUrlNames[username]}`
        }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData() {
    const baseUrl = `http://localhost:3000`;
    const server = await fetch(`${baseUrl}/whyd/2022/data/server.json`).then(
      (val) => val.json(),
    );
    return {
      server,
    };
  },
  data() {
    return {
      server: undefined,
      name: '',
      shouldShowTerminalButton: false,
    };
  },
  computed: {
    isNameValid() {
      return this.usernames.includes(this.name);
    },
    usernames() {
      return Object.values(this.server.urlNamesToNames).reverse();
    },
  },
  mounted() {
    this.shouldShowTerminalButton =
      localStorage.getItem('hasVisitedTerminal') === 'true';
  },
  methods: {
    goToIfValidName(path, name) {
      if (this.isNameValid) {
        const userId = this.server.namesToIds[name];

        localStorage.setItem('username', name);
        localStorage.setItem('userId', userId);
        this.$router.push(path);
      }
    },
    handleInputButtonPressed() {
      this.goToIfValidName(
        `/${this.server.namesToUrlNames[this.name]}`,
        this.name,
      );
    },
    handleTerminalButtonPressed() {
      this.goToIfValidName(`/terminal`, this.name);
    },
  },
};
</script>

<style scoped>
.layout {
  height: 100%;
}

.layout2 {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.whyd-button {
  background: linear-gradient(
    63deg,
    hsl(186, 12%, 50%),
    hsl(35, 12%, 50%),
    hsl(335, 12%, 50%),
    hsl(256, 12%, 50%)
  );
}

.hidden-links {
  height: 0;
  overflow: clip;
}
</style>
