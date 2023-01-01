<template>
  <div class="reactions-root">
    <h2 class="title">Most used reactions!</h2>
    <div class="top-2">
      <div class="upvote">
        <img
          src="/whyd/2022/data/emojis/upvote.png"
          alt="upvote"
          class="image"
        />
        <span class="count">{{ upvoteCount }}</span>
      </div>
      <div class="downvote">
        <img src="/whyd/2022/data/emojis/downvote.png" alt="downvote" />
        <span class="count">{{ downvoteCount }}</span>
      </div>
    </div>
    <div class="bottom-row">
      <div
        v-for="reaction in otherReactions"
        :key="reaction"
        :class="`reaction ${
          reactions[reaction].name === 'YOOOOOO' ? '' : 'noTitle'
        }`"
        :title="
          reactions[reaction].name === 'YOOOOOO'
            ? `According to SecBot, ~70% of these were Trent himself`
            : ''
        "
      >
        <img
          :src="
            imgUrl ?? `/whyd/2022/data/emojis/${reactions[reaction].name}.png`
          "
          :alt="imgUrl ? 'cheeto' : reactions[reaction].name"
        />
        <span class="count">{{ reactions[reaction].uses }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true,
    },
    imgUrl: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    reactions() {
      return this.stats.server.mostUsedReactions
    },
    otherReactions() {
      if (this.reactions == null) return []
      return Object.keys(this.reactions).filter(
        (r) => r !== '627365768111194117' && r !== '627365780849426442',
      )
    },
    upvoteCount() {
      if (this.reactions == null) return 0
      return this.reactions['627365768111194117'].uses
    },
    downvoteCount() {
      if (this.reactions == null) return 0
      return this.reactions['627365780849426442'].uses
    },
  },
}
</script>

<style scoped>
.reactions-root {
  padding-left: 35px;
  text-align: center;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.2));
}

.title {
  padding-left: 20px;
  margin-right: -10px;
}

.top-2 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 50px;
  margin: 20px 20px 20px 20px;
}

.top-2 div {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
}

.top-2 div img {
  max-height: 100px;
}

.top-2 .count {
  font-weight: bold;
  font-style: italic;
  font-size: larger;
}

.bottom-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  margin: 20px;
  padding: 0 20px;

  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.bottom-row .reaction {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
}

.bottom-row .reaction img {
  max-height: 2em;
  max-width: 2em;
}

.bottom-row .reaction.noTitle {
  cursor: default !important;
}

.bottom-row .reaction .count {
  font-weight: bold;
  font-style: italic;
}
</style>
