<template>
  <Whyd2022Chat v-if="messages && stats" :messages="messages" :stats="stats" />
</template>

<script>
export default {
  asyncData({ params }) {
    return {
      username: params.username
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
    const namesToIds = server.namesToIds
    const user = await fetch(
      `/whyd/2022/data/${namesToIds[this.username]}.json`
    ).then((r) => r.json())

    this.stats = { server, user }
    this.stats.user.name = this.username
  }
}
</script>
