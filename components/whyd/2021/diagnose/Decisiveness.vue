<template>
  <div class="container d-flex flex-column w-50 pt-5">
    <h4>{{ title }}</h4>
    <p>{{ percentage }}% of your messages were edited</p>
    <div class="timeOfDayChart ratio ratio-16x9 w-100 align-self-center">
      <Whyd2021EchartPie
        ref="pie"
        :title="''"
        :colors="[]"
        :bg-color="'#C6CCFB'"
        :text-color="'#303030'"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      title: '',
      count: 0,
      percentage: 0
    }
  },
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      const data = await fetch(
        `${urlPrefix}/user/${id}/editProportion.json`
      ).then((res) => res.json())
      const totalMessages = data.total
      const editedMessages = data.edited
      const editRatio = data.editRatio
      const uneditedMessages = totalMessages - editedMessages

      this.percentage = (editRatio * 100).toFixed(2)
      this.title =
        editRatio > 0.03
          ? "you're a bit more indecisive than everyone else"
          : 'you say what you mean, and mean what you say'

      const colors = ['#f3df4c', '#4c60f3']

      this.$refs.pie.init(
        [
          { name: 'Unedited', value: uneditedMessages },
          { name: 'Edited', value: editedMessages }
        ],
        colors
      )
    }
  }
}
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
