<template>
  <Whyd2022Chat v-if="messages && stats" :messages="messages" :stats="stats" />
</template>

<script>
import Vue from 'vue';
import { MESSAGES } from '~/utils/messages';

export default {
  async asyncData({ params }) {
    const baseUrl = `http://localhost:3000`;

    const server = await fetch(`${baseUrl}/whyd/2022/data/server.json`).then(
      (r) => r.json(),
    );
    const username = server.urlNamesToNames[params.username];
    const userId = server.namesToIds[username];
    const user = await fetch(
      `${baseUrl}/whyd/2022/data/${server.namesToIds[username]}.json`,
    ).then((r) => r.json());

    const stats = { server, user };

    Vue.set(stats.user, 'name', username);
    Vue.set(stats.user, 'id', userId);

    return {
      urlName: params.username,
      username,
      userId,
      stats,
    };
  },
  data() {
    const messages = MESSAGES.messages;
    messages.forEach((v, i) => {
      v.id = i;
      if (v.author == null) {
        v.author = messages[i - 1].author;
      }
    });
    return {
      messages,
      stats: undefined,
      username: undefined,
      userId: undefined,
    };
  },
  head() {
    return {
      title: 'whyd22',
      meta: [
        ['theme-color', this.stats.server.idsToColors[this.userId]],
        ['og:type', 'website'],
        ['og:site_name', 'what have you done 2022'],
        ['og:url', 'https://whyd.whid.live/'],
        ['og:title', 'Click here to see your personalized whyd22!'],
        ['og:description', `Here's a peek at what ${this.username} did:`],
        [
          'og:image',
          `https://whyd.whid.live/2022/data/embed_card/${this.userId}.png`,
        ],
        [
          'og:image:alt',
          `A collection of statistics for the whid member ${this.username}`,
        ],
        ['twitter:card', 'summary_large_image'],
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
            };
      }),
    };
  },
  mounted() {
    localStorage.setItem('username', this.username);
    localStorage.setItem('userId', this.userId);
  },
};
</script>
