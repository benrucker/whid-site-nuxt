<template>
  <div class="message">
    <div class="content text-break">{{ content }}</div>
    <div
      class="attachment"
      v-for="attachment in attachments"
      :key="attachment.id"
    >
      <video controls v-if="attachment.url.endsWith('.mp4')">
        <source :src="attachment.url" />
      </video>
      <img v-else :src="attachment.url" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: "",
    attachments: [{
      id: "",
      url: "",
    }],
  },
};
</script>

<style scoped>
.message {
  background: #222;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
  padding: 1em;
}

img {
  max-width: 100%;
}
</style>