<template>
  <span :class="'wrapper ' + (spoiler ? 'spoiler' : '') + (big ? ' big' : ' notbig')" ref="spoilerBg">
    <img
      v-if="processedEmoji"
      :class="
        'emoji ' + (big ? 'big' : 'notbig') + (spoiler ? ' spoilerEmoji' : '')
      "
      :src="processedEmoji"
      v-on:click="removeSpoiler"
      ref="emoji"
    />
    <span v-else>{{ emoji }}</span>
  </span>
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
    spoiler: {
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
  methods: {
    removeSpoiler() {
      this.$refs.emoji.classList.remove("spoilerEmoji");
      this.$refs.spoilerBg.classList.remove("spoiler");
    },
  },
};
</script>

<style>
.big {
  height: 4rem;
}

.notbig {
  height: 1em;
}

.wrapper {
  display: inline-flex;
  vertical-align: bottom;
}

.spoilerEmoji {
  opacity: 0;
}

.spoiler {
  background: #202225;
  /* height: fit-content; */
  border-radius: 4px;
}
</style>