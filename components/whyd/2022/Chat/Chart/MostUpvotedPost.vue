<template>
  <Whyd2022ChatDiscordMessageBlock :messages="[message]" :stats="stats" />
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
  computed: {
    message() {
      if (this.stats == null) return {}
      const rawMessage = this.stats.server['Most Upvoted Post']
      const val = {
        authorName: rawMessage?.author.name,
        authorAvatar: this.stats.server?.idsToAvatars[rawMessage?.author.id],
        authorColor: rawMessage?.author.color,
        attachments: rawMessage?.attachments.map(
          (attachment) => attachment.url,
        ),
        content: rawMessage?.content,
        reactions: rawMessage?.reactions,
        timestamp: rawMessage?.timestamp,
      }
      return val
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped></style>
