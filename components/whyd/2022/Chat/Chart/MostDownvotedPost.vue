<template>
  <Whyd2022ChatDiscordMessage
    :content="content"
    :reactions="reactions"
    :author-name="authorName"
    :author-avatar="authorAvatar"
    :attachments="attachments"
    :timestamp="timestamp"
  />
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      content: '',
      reactions: {},
      authorName: '',
      authorAvatar: '',
      attachments: [],
      timestamp: ''
    }
  },
  mounted() {
    if (this.stats.server.mostDownvotedPost == null) {
      this.content = 'Bad take'
      this.reactions = {
        downvote: 20,
        cheeto: 5,
        ahegao1: 1,
        downvote2: 4,
        downvote3: 5
      }
      this.authorName = 'bebenebenebeb'
      this.authorAvatar =
        'https://cdn.discordapp.com/avatars/171471874969042945/052a661e1ec4f31166cc3e93dc588d4d.png?size=1024'
      this.attachments = ['/miniwyatt.png', '/whyd/camera.png']
      this.timestamp = '09/25/2022'
    }
  },
  methods: {}
}
</script>

<style scoped></style>
