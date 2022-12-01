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
      const rawMessage = this.stats?.server['Most Upvoted Post']
      if (rawMessage == null) return {}
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
      console.log(val)
      return val
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
