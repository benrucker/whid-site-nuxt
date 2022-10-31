<template>
  <div class="reactions-root">
    <h2 class="title">Most used reactions!</h2>
    <div class="top-2">
      <div class="upvote">
        <img src="/whyd/2022/emojis/upvote.png" alt="upvote" class="image" />
        <span class="count">{{ upvoteCount }}</span>
      </div>
      <div class="downvote">
        <img src="/whyd/2022/emojis/downvote.png" alt="downvote" />
        <span class="count">{{ downvoteCount }}</span>
      </div>
    </div>
    <div class="bottom-row">
      <div v-for="reaction in otherReactions" :key="reaction" class="reaction">
        <img :src="`/whyd/2022/emojis/${reaction}.png`" :alt="reaction" />
        <span class="count">{{ reactions[reaction] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      upvoteCount: 0,
      downvoteCount: 0,
      reactions: {},
      otherReactions: {}
    }
  },
  mounted() {
    this.reactions = this.stats.server.mostUsedReactions ?? {
      upvote: 900,
      downvote: 100,
      cheeto: 50,
      ahegao1: 40,
      benheh: 30
    }
    this.otherReactions = Object.keys(this.reactions).filter(
      (r) => r !== 'upvote' && r !== 'downvote'
    )
    this.upvoteCount = this.reactions.upvote
    this.downvoteCount = this.reactions.downvote
  }
}
</script>

<style scoped>
.reactions-root {
  padding-left: 35px;
  text-align: center;
}

.title {
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

.bottom-row .reaction .count {
  font-weight: bold;
  font-style: italic;
}
</style>
