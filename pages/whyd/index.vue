<template>
  <div>
    <div class="container text-center pt-5">
      <img src="/whyd/2021/you.png" class="w-25 pb-4" />
      <h1 class="pb-3">
        <b>
          <i class="title-text">what have you done 2022</i>
        </b>
      </h1>
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
          <option v-for="username in Object.keys(names)" :key="username">
            {{ username }}
          </option>
        </datalist>
        <button
          class="btn btn-secondary whyd-button"
          type="button"
          @click="handleInputButtonPressed"
        >
          <i>whyd</i>
        </button>
      </div>

      <div class="d-flex flex-row-reverse mt-5">
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
      names: {},
      name: '',
      namesToIds: {}
    }
  },
  async mounted() {
    const namesData = await fetch('/whyd/2021/data/nameToName.json')
    this.names = await namesData.json()
    const serverData = await fetch('/whyd/2022/data/server.json')
    const serverJson = await serverData.json()
    this.namesToIds = serverJson.namesToIds
  },
  methods: {
    handleInputButtonPressed() {
      if (Object.keys(this.names).includes(this.name)) {
        localStorage.username = this.name
        localStorage.userId = this.namesToIds[this.name]
        this.$router.push(`/whyd/${this.names[this.name]}`)
      }
    },
    handleLastYearButtonPressed() {
      this.$router.push('/whyd/2021')
    }
  }
}
</script>

<style scoped lang="scss">
.title-text {
  position: relative;
  color: rgba(0, 0, 0, 0);
  background: linear-gradient(99deg, #a3eff7, #ffd294, #fcaecf, #bda6ff);
  overflow: clip;
  background-clip: text;
  background-size: 200% 100%;
  background-position: 100%;
  transition: background-position 0.5s ease;
  text-decoration: none;

  animation: background-move 10s ease-in-out infinite;
}

@keyframes background-move {
  0% {
    background-position: 100%;
  }
  50% {
    background-position: 0%;
  }
}
</style>
