<template>
  <div>
    <WhydTop5 :names="users" :counts="counts" :unit="'Mentions'" />
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
      users: [],
      counts: [],
    };
  },
  async mounted() {
    let data = await fetch(`${this.urlPrefix}/mentions.json`).then((res) =>
      res.json()
    );
    this.users = Object.keys(data).slice(0, 5).map(x => '@' + x);
    this.counts = Object.values(data)
      .slice(0, 5)
      .map((x) => x.toLocaleString());
  },
  methods: {},
};
</script>