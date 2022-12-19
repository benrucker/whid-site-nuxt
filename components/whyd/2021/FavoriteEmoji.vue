<template>
  <div>
    <h1>
      also, your favorite emoji was
      <Whyd2021Emoji
        :emoji="emoji"
        :big="false"
        :url-prefix="urlPrefix"
      />.<br />you sent that bad boy a total of <b>{{ count }}</b>
      {{ count == 1 ? 'time' : 'times' }}.
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    urlPrefix: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      emoji: '',
      count: ''
    }
  },
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      const data = await fetch(`${urlPrefix}/user/${id}/favEmoji.json`).then(
        (res) => res.json()
      )
      this.count = data.countOfMostSentEmoji
      this.emoji = data.mostSentEmoji
    }
  }
}
</script>
