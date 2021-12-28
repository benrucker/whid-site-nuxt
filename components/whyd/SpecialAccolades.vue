<template>
  <div>
    <div v-if="channelAccolades">
      <h3>and speaking of firsts: this year, you did something special!</h3>
      <div v-for="(stuff, channel) in channelAccolades" :key="channel">
        <h4 class="ps-5 pt-3">
          you sent the first message in <b>#{{ channel }}</b
          >:
        </h4>
        <div class="pt-3 d-flex justify-content-center">
          <WhydMessage
            :content="stuff.content"
            :attachments="stuff.attachments"
            :class="'w-50 ' + (stuff.firstEver ? 'firstEverShadow' : '')"
          />
        </div>
        <div v-if="stuff.firstEver" class="pb-5 pt-2 text-center">
          ^ this was the first message in the whole server!
        </div>
        <div v-else class="pb-5"></div>
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
      channelAccolades: [],
    };
  },
  computed: {},
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      let firstInChannels = await fetch(
        `${urlPrefix}/user/${id}/firstMessageInChannels.json`
      ).then((res) => {
        if (res.status === 404) return false;
        return res.json();
      });
      console.log(firstInChannels);
      if (firstInChannels) {
        this.channelAccolades = firstInChannels;
      } else this.channelAccolades = false;
    },
  },
};
</script>

<style scoped>
.firstEverShadow {
  box-shadow: 0px 0px 10px 3px #f3df4c;
}

div.firstEver::after {
  content: "first in whole server!";
}
</style>