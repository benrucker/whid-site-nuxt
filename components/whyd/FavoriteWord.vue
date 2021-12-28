<template>
  <div>
    <h1>
      your favorite word this year was <b>{{ word }}</b
      >.<br />I know this cause you used it <b>{{ count }}</b>
      {{ count == 1 ? "time" : "times" }}.
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    urlPrefix: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      word: "",
      count: "",
    };
  },
  async mounted() {},
  methods: {
    async init(id, urlPrefix) {
      let data = await fetch(
        `${urlPrefix}/user/${id}/mostUsedWordsNoStop.json`
      ).then((res) => res.json());
      let sorted = Object.values(data).sort((a, b) => b[1] - a[1]);
      this.word = sorted[0][0];
      this.count = sorted[0][1];
    },
  },
};
</script>