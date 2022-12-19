<template>
  <div>
    <div class="container text-center pt-5">
      <img src="/whyd/2021/you.png" class="w-25 pb-4" />
      <h1 class="pb-3">
        <b><i>what have you done 2022</i></b>
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
          class="btn btn-secondary"
          type="button"
          @click="inputButtonPressed"
        >
          <i>whyd</i>
        </button>
      </div>

      <div class="mt-5 text-end text-muted">Click here for whyd 2021</div>
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
    inputButtonPressed() {
      if (Object.keys(this.names).includes(this.name)) {
        localStorage.username = this.name
        localStorage.userId = this.namesToIds[this.name]
        this.$router.push(`/whyd/${this.names[this.name]}`)
      }
    }
  }
}
</script>
