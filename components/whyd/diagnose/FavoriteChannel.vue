<template>
  <div class="container d-flex flex-column w-50">
    <h4>{{ title }}</h4>
    <div class="channelChart ratio ratio-4x3 w-100 align-self-center">
      <WhydEchartDonut
        :title="'Messages'"
        :color="'#fff'"
        :bgColor="'#C6CCFB'"
        :textColor="'#303030'"
        ref="donut"
      />
    </div>
  </div>
</template>

<script>
let titleMap = {
  spam: "you're a bot whisperer",
  gamers: "you're a gamer",
  politics: "you're a future presidential candidate",
  "the-real-us": "you prefer imaginary friends",
  "videos-and-music": "you're a consumer",
  do: "you like chatting ;)",
  "chat「雑談」": "you like chatting (in japanese) :)",
  "spam「スパム」": "you're a bot whisperer (in korean)",
  admin: "you're bad at picking teams",
  whidiscussion: "you enjoy bad content",
  voting: "you enjoy democracy, maybe",
  league: "you spent the year inting",
  website: "this one won't show up",
  dev: "you're a computer",
  dnd: "you roll low on initiative",
  japan: "you're a weeb 🤢",
  dont: "you're a major 🤢",
};

export default {
  props: {},
  data() {
    return {
      title: "",
    };
  },
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      let data = await fetch(`${urlPrefix}/user/${id}/channels.json`).then(
        (res) => res.json()
      );
      this.favorite = data.favChannel;
      this.title = titleMap[this.favorite];
      delete data.favChannel;
      let sorted = Object.entries(data).sort((a, b) => a[1] - b[1]);
      sorted = sorted.filter(([, count]) => count > 0);

      this.$refs.donut.init(
        sorted.map((x) => {
          return { name: x[0], value: x[1] };
        }),
        []
      );
    },
  },
};
</script>

<style scoped>
.channelChart {
  width: 50%;
}
</style>