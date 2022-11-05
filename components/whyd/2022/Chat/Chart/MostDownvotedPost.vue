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
      message: {
        content: 'bad take or smn',
        reactions: [
          { name: 'downvote', count: 20 },
          { name: 'cheeto', count: 5 },
          { name: 'ahegao1', count: 1 },
          { name: 'downvote2', count: 4 },
          { name: 'downvote3', count: 5 }
        ],
        authorName: 'bebenebenebeb',
        timestamp: '09/23/2022',
        authorAvatar:
          'https://cdn.discordapp.com/avatars/171471874969042945/052a661e1ec4f31166cc3e93dc588d4d.png?size=1024',
        attachments: ['/miniwyatt.png', '/icon-l.png']
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
