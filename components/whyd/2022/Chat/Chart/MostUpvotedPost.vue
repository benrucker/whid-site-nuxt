<template>
  <Whyd2022ChatDiscordMessageBlock :messages="[message]" />
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    message() {
      if (this.stats == null) return {}
      const rawMessage = this.stats.server['Most Upvoted Post']
      const val = {
        authorName: rawMessage?.author.name,
        authorAvatar: this.stats.server?.avatars[rawMessage?.author.id],
        authorColor: rawMessage?.author.color,
        attachments: rawMessage?.attachments.map(
          (attachment) => attachment.url
        ),
        content: rawMessage?.content,
        reactions: rawMessage?.reactions,
        timestamp: rawMessage?.timestamp
      }
      return val
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
