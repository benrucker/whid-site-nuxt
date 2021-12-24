<template>
  <div>
    <img class="emoji" v-if="processedEmoji" :src="processedEmoji" />
    <span v-else>{{ emoji }}</span>
  </div>
</template>

<script>
export default {
  props: {
    urlPrefix: {
      type: String,
      default: "",
    },
    emoji: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      processedEmoji: this.emoji,
    };
  },
  async mounted() {
    if (this.emoji.startsWith(":")) {
      this.processedEmoji = `/whyd/2021/emojis/${this.emoji.replaceAll(':', '')}`;
      if (this.emoji.includes('shred') || this.emoji.includes('hoedown')) {
        this.processedEmoji += ".gif";
      } else {
        this.processedEmoji += ".png";
      }
    }
  },
};
</script>

<style>
img.emoji {
    height: 4rem;
}
</style>