<template>
  <div class="container d-flex flex-column w-50 pt-5">
    <h4>you're {{ title }}</h4>
    <p>better check your horoscope</p>
    <div class="astroChart ratio ratio-4x3 w-75 align-self-center">
      <WhydEchartBarPolar
        ref="astroChart"
        :title="'Messages'"
        :color="'#fff'"
        :bg-color="'#C6CCFB'"
        :text-color="'#303030'"
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
      preposition: '',
      timeRange: ''
    }
  },
  async mounted () {},
  methods: {
    async init (id, urlPrefix) {
      const data = await fetch(`${urlPrefix}/user/${id}/sign.json`).then(
        res => res.json()
      )
      this.title = `${/^[AEIOU]/.test(data.maxSign) ? 'an' : 'a'} ${data.maxSign}`
      delete data.maxSign

      const signs = Object.keys(data)
      const counts = Object.values(data)

      this.$refs.astroChart.init(signs, counts)
    }
  }
}
</script>

<style scoped>
</style>
