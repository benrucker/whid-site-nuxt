<template>
  <div>
    <div class="container text-center pt-5">
      <img src="/whyd/2021/you.png" class="w-25 pb-4" />
      <h1 class="pb-3">
        <b><i>what have you done 2021</i></b>
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
          <option v-for="nameOption in Object.keys(names)" :key="nameOption">
            {{ nameOption }}
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      names: {},
      name: ''
    }
  },
  async mounted() {
    this.names = await fetch('/whyd/2021/data/nameToName.json').then((res) =>
      res.json()
    )
  },
  methods: {
    inputButtonPressed() {
      if (Object.keys(this.names).includes(this.name)) {
        this.$router.push(`/whyd/2021/${this.names[this.name]}`)
      }
    }
  }
}
</script>
