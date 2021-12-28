<template>
  <div class="container pt-5">
    <div class="row py-5">
      <h3 class="col-6">
        conversation is nothing without a partner, and you took a liking to @{{
          repliedTo
        }}
        by replying to them {{ replyToCount }}
        {{ replyToCount == 1 ? "time" : "times" }}
      </h3>
    </div>
    <div class="row py-5">
      <h3 class="col-6"></h3>
      <h3 class="col-6">
        ...on the other hand, @{{ repliedToYou }} replied to you more
        than anyone else did with {{ repliedToYouCount }}...
      </h3>
    </div>
    <div class="row py-5">
      <h3 class="col-6">
        ...on the <i>other</i> other hand, replies don't tell you the whole story.<br />you
        were most likely to send a message if @{{ messagedAfter }} had sent the
        previous one.
      </h3>
    </div>
    <div class="d-flex justify-content-center py-5">
      <div class="w-50">
        <h3 class="text-center">
          let's move on before this becomes some weird love square
          <WhydEmoji
            :spoiler="true"
            :big="false"
            :urlPrefix="urlPrefix"
            :emoji="':cheeto:'"
          />
          shit.
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    urlPrefix: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      title: "",
      repliedTo: "",
      replyToCount: "",
      repliedToYou: "",
      repliedToYouCount: "",
      messagedAfter: "",
    };
  },
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      let youMostRepliedTo = await fetch(
        `${urlPrefix}/user/${id}/repliedTo.json`
      ).then((res) => res.json());
      let mostRepliedToYou = await fetch(
        `${urlPrefix}/user/${id}/repliedToYou.json`
      ).then((res) => res.json());
      let sentMessageAfter = await fetch(
        `${urlPrefix}/user/${id}/sentMessageAfter.json`
      ).then((res) => res.json());

      this.repliedTo = youMostRepliedTo.mostRepliedTo;
      this.replyToCount = youMostRepliedTo.mostRepliedToCount;

      this.repliedToYou = mostRepliedToYou.repliedToYou;
      this.repliedToYouCount = mostRepliedToYou.repliedToYouCount;

      this.messagedAfter = sentMessageAfter.mostOftenSentAfter;
    },
  },
};
</script>

<style scoped>
.timeOfDayChart {
  width: 50%;
}
</style>

<style>
.w-60 {
  width: 60%;
}
</style>