<template>
  <Whyd2022Chat v-if="messages && stats" :messages="messages" :stats="stats" />
</template>

<script>
import Vue from 'vue'

export default {
  async asyncData({ params, isDev }) {
    const baseUrl = isDev
      ? `http://localhost:3000`
      : 'https://develop.whid.live'

    const server = await fetch(`${baseUrl}/whyd/2022/data/server.json`).then(
      (r) => r.json(),
    )
    const username = server.urlNamesToNames[params.username]
    const userId = server.namesToIds[username]
    const user = await fetch(
      `${baseUrl}/whyd/2022/data/${server.namesToIds[username]}.json`,
    ).then((r) => r.json())

    const stats = { server, user }

    Vue.set(stats.user, 'name', username)
    Vue.set(stats.user, 'id', userId)

    return {
      urlName: params.username,
      username,
      userId,
      stats,
    }
  },
  data() {
    return {
      messages: undefined,
      stats: undefined,
      username: undefined,
      userId: undefined,
    }
  },
  async fetch() {
    this.messages = (await this.$nuxt.$content('messages').fetch()).messages
    this.messages.forEach((v, i) => {
      v.id = i
      if (v.author == null) {
        v.author = this.messages[i - 1].author
      }
    })
  },
  head() {
    return {
      title: 'whyd22',
      meta: [
        ['theme-color', '#bbeebb'],
        ['og:type', 'website'],
        ['og:site_name', 'what have you done 2022'],
        ['og:url', 'https://whid.live/whyd'],
        ['og:title', 'Click here to see your personalized whyd22!'],
        [
          'og:description',
          `Find out what you did at [whid.live/whyd](https://develop.whid.live/whyd)!\n\nHere's a peek at what ${this.username} did:`,
        ],
        [
          'og:image',
          `https://develop.whid.live/whyd/2022/data/embed_card/${this.userId}.png`,
        ],
        ['og:image:width', '770'],
        ['og:image:height', '530'],
        [
          'og:image:alt',
          `A collection of statistics for the whid member ${this.username}`,
        ],
        ['twitter:card', 'summary_large_card'],
        ['twitter:site', '@warkcf'],
        ['twitter:creator', '@warkcf'],
      ].map(([name, content]) => {
        return name.startsWith('twitter')
          ? {
              hid: name,
              name,
              content,
            }
          : {
              hid: name,
              property: name,
              content,
            }
      }),
    }
  },
  mounted() {
    localStorage.setItem('username', this.username)
    localStorage.setItem('userId', this.userId)
  },
}
</script>
