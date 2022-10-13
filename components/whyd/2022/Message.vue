<template>
  <div :class="msg.side + ' message' + (isLastInGroup ? ' message-tail' : ' ')">
    <span class="authorWrapper">
      <img
        v-if="isLastInGroup"
        :key="index"
        src="/whyd/2021/emojis/cheeto.png"
        class="author"
      />
    </span>
    <div class="content">
      <component
        :is="'Whyd2022' + (msg.type || 'Text')"
        :content="msg.content"
        :data="data"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },

    data: {
      type: Object,
      required: true
    },
    isLastInGroup: {
      type: Boolean,
      required: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      const prevMessage = this.$el.previousElementSibling

      if (prevMessage) {
        const prevHeight = prevMessage.offsetHeight / 2
        const thisHeight = this.$el.offsetHeight / 2

        console.log(prevHeight, thisHeight)

        document.documentElement.style.setProperty(
          '--avatar-slide-distance',
          `-${prevHeight + thisHeight + 16}px`
        )
      }
    })
  }
}
</script>

<style></style>
