<template>
  <div class="container d-flex flex-column w-50 pt-5">
    <h4>you're {{ title }}</h4>
    <p>many of your messages were sent {{ preposition }}, {{ timeRange }}</p>
    <div class="timeOfDayChart ratio ratio-16x9 w-75 align-self-center">
      <Whyd2021EchartHist
        ref="hist"
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
  morning: 'crazy',
  afternoon: 'productive in the afternoon',
  evening: 'a night owl',
  overnight: 'nocturnal (or Kian)'
}

const prepositioned = {
  morning: 'in the morning',
  afternoon: 'in the afternoon',
  evening: 'in the evening',
  overnight: 'overnight'
}

const timeMap = {
  morning: '6am - 12pm',
  afternoon: '12pm - 6pm',
  evening: '6pm - 12am',
  overnight: '12am - 6am'
}

export default {
  props: {},
  data() {
    return {
      title: '',
      preposition: '',
      timeRange: ''
    }
  },
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      const data = await fetch(`${urlPrefix}/user/${id}/timeOfDay.json`).then(
        (res) => res.json()
      )
      this.title = titleMap[data.maxTime]
      this.preposition = prepositioned[data.maxTime]
      this.timeRange = timeMap[data.maxTime]
      const labels = ['Overnight', 'Morning', 'Afternoon', 'Evening']
      const timeCounts = [
        data.overnight,
        data.morning,
        data.afternoon,
        data.evening
      ]

      this.$refs.hist.init(labels, timeCounts)
    }
  }
}
</script>

<style scoped>
.timeOfDayChart {
  width: 50%;
}
</style>
