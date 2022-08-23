<template>
  <div v-if="exists" class="container d-flex flex-column w-50 pt-5">
    <h4>you're a trailblazer</h4>
    <p>you started a conversation {{ count.toLocaleString() }} times after 5 hours of inactivity in a channel</p>
    <div class="timeOfDayChart ratio ratio-16x9 w-100 align-self-center">
      <WhydEchartHist
        ref="hist"
        :title="'Number of people who sent messages after\n5 hours of channel inactivity'"
        :color="'#ffffff'"
        :bg-color="'#C6CCFB'"
        :text-color="'#303030'"
        :right="false"
        :show-title="false"
        :formatter="(params) => `${params[0].value} ${params[0].value == 1 ? 'person' : 'people'} sent ${params[0].name} trailblazing messages`"
        :x-axis-label="''"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      title: '',
      exists: false,
      count: 0
    }
  },
  async mounted () {},
  methods: {
    async init (id, urlPrefix) {
      const data = await fetch(`${urlPrefix}/user/${id}/trailblazing.json`)
        .then((res) => {
          if (res.status === 404) {
            this.exists = false
            return false
          }
          this.exists = true
          return res.json()
        })
      if (!data) { return false }

      this.count = data.count
      const rank = data.rank

      const serverData = await fetch(`${urlPrefix}/trailblazeTimes.json`).then(
        res => res.json()
      )

      const labels = Object.keys(serverData).map((key) => {
        const high = key.split(', ')[1].split('.')[0]
        let low = key.split(', ')[0].split('.')[0].split('(')[1]
        low = low.startsWith('-') ? 0 : low
        return `${low}-${high}`
      })
      const counts = Object.values(serverData)

      this.$refs.hist.init(labels, counts)
    }
  }
}
</script>

<style scoped>
.timeOfDayChart {
  width: 50%;
}
</style>
