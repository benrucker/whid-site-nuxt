<template>
  <Whyd2022ChatDiscordMessageBlock
    :messages="messages.slice(0, 2)"
    :stats="stats"
  />
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
      const threeMostReactedImages = this.stats.server['Most Reacted Image']
      const ids = Object.keys(threeMostReactedImages)
        .filter((messageId) => {
          // filter out the most upvoted image
          return messageId !== '978860667186593792'
        })
        .slice(0, 2)
      return [
        threeMostReactedImages[ids[0]],
        threeMostReactedImages[ids[1]],
      ].map((msg) => {
        return {
          authorName: msg.author.name,
          authorAvatar: this.stats.server?.idsToAvatars[msg.author.id],
          authorColor: msg.author.color,
          attachments: msg.attachments.map((attachment) => attachment.url),
          content: msg.content,
          reactions: msg.reactions,
          timestamp: msg.timestamp,
        }
      })
    },
  },
}
</script>

<style scoped></style>
