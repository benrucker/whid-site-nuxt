<template>
  <span
    v-if="processedEmoji"
    ref="spoilerBg"
    :class="
      'wrapper ' + (spoiler ? 'spoiler' : '') + (big ? ' big' : ' notbig')
    "
  >
    <img
      ref="emoji"
      :class="
        'emoji ' + (big ? 'big' : 'notbig') + (spoiler ? ' spoilerEmoji' : '')
      "
      :src="processedEmoji"
      @click="removeSpoiler"
    >
  </span>
  <span v-else>{{ emoji }}</span>
</template>

<script>
export default {
  props: {
    urlPrefix: {
      type: String,
      default: ''
    },
    emoji: {
      type: String,
      default: ''
    },
    big: {
      type: Boolean,
      default: false
    },
    spoiler: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // processedEmoji: this.emoji,
    }
  },
  computed: {
    processedEmoji () {
      if (this.emoji.startsWith(':')) {
        let output = `/whyd/2021/emojis/${this.emoji.replaceAll(':', '')}`
        const animated = [':shred:', ':hoedown:', ':trueshred:']
        const svgs = [':eyes:', ':lion:', ':microbe:', ':pushpin:', ':warning:']

        if (animated.includes(this.emoji)) {
          output += '.gif'
        } else if (svgs.includes(this.emoji)) {
          output += '.svg'
        } else {
          output += '.png'
        }
        return output
      } else {
        return false
      }
    }
  },
  async mounted () {},
  methods: {
    removeSpoiler () {
      this.$refs.emoji.classList.remove('spoilerEmoji')
      this.$refs.spoilerBg.classList.remove('spoiler')
    }
  }
}
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
  cursor: pointer;
}

.spoiler {
  background: #202225;
  /* height: fit-content; */
  border-radius: 4px;
}
</style>
