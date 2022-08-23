<template>
  <div class="container d-flex flex-column w-50 pt-5">
    <h4>{{ title }}</h4>
    <p>your favorite channel was #{{ favorite }}</p>
    <div class="channelChart ratio ratio-4x3 w-100 align-self-center">
      <WhydEchartDonut
        ref="donut"
        :title="'Messages'"
        :color="'#fff'"
        :bg-color="'#C6CCFB'"
        :text-color="'#303030'"
      />
    </div>
  </div>
</template>

<script>
const titleMap = {
  spam: "you're a bot whisperer",
  gamers: "you're a gamer",
  politics: "you're a future presidential candidate",
  'the-real-us': 'you prefer imaginary friends',
  'videos-and-music': "you're a consumer",
  do: 'you like chatting ;)',
  'chat「雑談」': 'you like chatting (in japanese) :)',
  'spam「スパム」': "you're a bot whisperer (in korean)",
  admin: "you're bad at picking teams",
  whidiscussion: 'you enjoy bad content',
  voting: 'you enjoy democracy, maybe',
  league: 'you spent the year inting',
  website: "this one won't show up",
  dev: "you're a computer",
  dnd: 'you roll low on initiative',
  japan: "you're a weeb 🤢",
  dont: "you're a major 🤢"
}

export default {
  props: {},
  data () {
    return {
      title: '',
      favorite: ''
    }
  },
  async mounted () {},
  methods: {
    async init (id, urlPrefix) {
      const data = await fetch(`${urlPrefix}/user/${id}/channels.json`).then(
        res => res.json()
      )
      this.favorite = data.favChannel
      this.title = titleMap[this.favorite]
      delete data.favChannel
      let sorted = Object.entries(data).sort((a, b) => a[1] - b[1])
      sorted = sorted.filter(([, count]) => count > 0)

      this.$refs.donut.init(
        sorted.map((x) => {
          return { name: x[0], value: x[1] }
        }),
        []
      )
    }
  }
}
</script>

<style scoped>
.channelChart {
  width: 50%;
}
</style>
