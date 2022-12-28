<template>
  <div class="message-block">
    <Whyd2022ChatDiscordMessage
      v-for="msg in messages"
      :key="`${msg.content}${msg.authorName}${msg.timestamp}`"
      :content="msg.content"
      :reactions="msg.reactions"
      :author-name="msg.authorName"
      :author-avatar="msg.authorAvatar"
      :author-color="msg.authorColor"
      :attachments="msg.attachments"
      :timestamp="msg.timestamp"
      :stats="stats"
    />
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true,
    },
    messages: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.message-block {
  background-color: #393c43;
  border-radius: 5px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  /* overflow: hidden; */
  padding-top: 5px;
  padding-bottom: 0.1em;
  font-size: 0.95em;
}
</style>
