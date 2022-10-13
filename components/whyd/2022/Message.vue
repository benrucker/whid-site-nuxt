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
    const lastMessage = document
      .getElementsByClassName('message message-tail')
      .item(0)

    if (lastMessage) {
      const h =
        lastMessage.offsetHeight > 32
          ? lastMessage.offsetHeight / 2
          : lastMessage.offsetHeight

      document.documentElement.style.setProperty(
        '--avatar-slide-distance',
        `calc(-${h}px - 1em)`
      )
    }
  }
}
</script>

<style></style>
