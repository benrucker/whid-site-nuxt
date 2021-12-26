<template></template>

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
    return {};
  },
  async mounted() {},
  methods: {
    async init() {
      let data = await fetch(
        `${this.urlPrefix}/user/${this.id}/monthCounts.json`
      ).then((res) => res.json());
    },
  },
};
</script>