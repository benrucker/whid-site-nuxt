<template>
  <Whyd2022ChatDiscordMessageBlock :messages="messages" :stats="stats" />
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
    messages() {
      const wishes = this.stats.user.birthdayWishes
      return Object.values(wishes)
        .filter((msg) => msg != null)
        .map((msg) => {
          return {
            authorName: msg.author.name,
            authorAvatar: this.stats.server?.idsToAvatars[msg.author.id],
            authorColor: msg.author.color,
            attachments: msg.attachments.map((attachment) => attachment.url),
            content: msg.content,
            reactions: msg.reactions,
            timestamp: msg.timestamp,
            url: msg.url,
          }
        })
    },
  },
}
</script>

<style scoped></style>
