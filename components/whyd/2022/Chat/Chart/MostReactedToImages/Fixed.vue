<template>
  <Whyd2022ChatDiscordMessageBlock :messages="messages.slice(0, 2)" />
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
    messagesByColumn() {
      return this.stats.server['Most Reacted Image']
    },
    messageIds() {
      return Object.keys(this.messagesByColumn.type)
    },
    messages() {
      const val = this.messageIds?.map((messageId) => {
        return {
          authorName: this.messagesByColumn?.author[messageId].name,
          authorAvatar:
            this.stats.server?.avatars[
              this.messagesByColumn.author[messageId].id
            ],
          authorColor: this.messagesByColumn?.author[messageId].color,
          attachments: this.messagesByColumn?.attachments[messageId].map(
            (attachment) => attachment.url
          ),
          content: this.messagesByColumn?.content[messageId],
          reactions: this.messagesByColumn?.reactions[messageId],
          timestamp: this.messagesByColumn?.timestamp[messageId]
        }
      })
      return val
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
