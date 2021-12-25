<template>
  <img
    v-if="processedEmoji"
    :class="'emoji ' + big ? 'big' : ''"
    :src="processedEmoji"
  />
  <span v-else>{{ emoji }}</span>
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
    big: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      processedEmoji: this.emoji,
    };
  },
  async mounted() {
    if (this.emoji.startsWith(":")) {
      this.processedEmoji = `/whyd/2021/emojis/${this.emoji.replaceAll(
        ":",
        ""
      )}`;
      if (this.emoji.includes("shred") || this.emoji.includes("hoedown")) {
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
  height: 1em;
}

.big {
  height: 4rem;
}
</style>