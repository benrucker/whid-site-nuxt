<template>
  <Whyd2022Chat v-if="messages && stats" :messages="messages" :stats="stats" />
</template>

<script>
import Vue from 'vue'

export default {
  asyncData({ params }) {
    return {
      urlName: params.username
    }
  },
  data() {
    return {
      messages: undefined,
      stats: undefined
    }
  },
  async fetch() {
    this.messages = (await this.$nuxt.$content('messages').fetch()).messages
    this.messages.forEach((v, i) => {
      v.id = i
    })
  },
  async mounted() {
    const server = await fetch('/whyd/2022/data/server.json').then((r) =>
      r.json()
    )
    const username = server.urlNamesToNames[this.urlName]
    const userId = server.namesToIds[username]
    const user = await fetch(
      `/whyd/2022/data/${server.namesToIds[username]}.json`
    ).then((r) => r.json())

    this.stats = { server, user }

    Vue.set(this.stats.user, 'name', username)
    Vue.set(this.stats.user, 'id', userId)

    localStorage.setItem('username', username)
    localStorage.setItem('userId', userId)
  }
}
</script>
