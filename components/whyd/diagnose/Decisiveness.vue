<template>
  <div class="container d-flex flex-column w-50 pt-5">
    <h4>{{ title }}</h4>
    <p>{{ percentage }}% of your messages were edited</p>
    <div class="timeOfDayChart ratio ratio-16x9 w-100 align-self-center">
      <WhydEchartPie
        :title="''"
        :colors="[]"
        :bgColor="'#C6CCFB'"
        :textColor="'#303030'"
        ref="pie"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      title: "",
      count: 0,
      percentage: 0,
    };
  },
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      let data = await fetch(
        `${urlPrefix}/user/${id}/editProportion.json`
      ).then((res) => res.json());
      let totalMessages = data.total;
      let editedMessages = data.edited;
      let editRatio = data.editRatio;
      let uneditedMessages = totalMessages - editedMessages;

      this.percentage = (editRatio * 100).toFixed(2);
      this.title =
        editRatio > 0.03
          ? "you're a bit more indecisive than everyone else"
          : "you say what you mean, and mean what you say";

      let colors = ["#f3df4c", "#4c60f3"];

      console.log(totalMessages, editedMessages, uneditedMessages, editRatio);

      this.$refs.pie.init(
        [
          { name: "Unedited", value: uneditedMessages },
          { name: "Edited", value: editedMessages },
        ],
        colors
      );
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