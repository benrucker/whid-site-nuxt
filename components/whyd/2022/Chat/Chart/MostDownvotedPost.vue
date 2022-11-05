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
  data() {
    return {
      message: {}
    }
  },
  mounted() {
    if (this.stats.server.mostDownvotedPost == null) {
      this.message.content = 'Bad take'
      this.message.reactions = {
        downvote: 20,
        cheeto: 5,
        ahegao1: 1,
        downvote2: 4,
        downvote3: 5
      }
      this.message.authorName = 'bebenebenebeb'
      this.message.authorAvatar =
        'https://cdn.discordapp.com/avatars/171471874969042945/052a661e1ec4f31166cc3e93dc588d4d.png?size=1024'
      this.message.attachments = ['/miniwyatt.png', '/whyd/camera.png']
      this.message.timestamp = '09/25/2022'
    }
  },
  methods: {}
}
</script>

<style scoped></style>
