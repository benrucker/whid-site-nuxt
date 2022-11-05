<template>
  <Whyd2022ChatDiscordMessageBlock :messages="[message1, message2]" />
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
      message1: {
        content: 'things',
        reactions: {
          downvote: 20,
          cheeto: 5,
          ahegao1: 1,
          downvote2: 4,
          downvote3: 5
        },
        authorName: 'fops',
        timestamp: '09/24/2022',
        authorAvatar:
          'https://cdn.discordapp.com/avatars/474944065507688448/8301df1e9a6ee69b01cd3f20e565aa3a.png?size=1024',
        attachments: ['/miniwyatt.png', '/camera.png']
      },
      message2: {
        content: 'fun stuff',
        reactions: {
          upvote: 20,
          cheeto: 5,
          ahegao1: 1,
          downvote2: 4,
          downvote3: 5
        },
        authorName: 'noss',
        timestamp: '09/25/2022',
        authorAvatar:
          'https://cdn.discordapp.com/avatars/184405311681986560/7e25f540b31d70360e69fea14dbd865a.png?size=1024',
        attachments: ['/miniwyatt.png', '/camera.png']
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
