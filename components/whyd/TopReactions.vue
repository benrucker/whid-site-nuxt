<template>
  <div>
    <WhydTop5
      :names="users"
      :counts="counts"
      :emojis="true"
      :urlPrefix="urlPrefix"
      :unit="'Reactions'"
    />
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
    let data = await fetch(`${this.urlPrefix}/serverReactions.json`).then(
      (res) => res.json()
    );
    this.users = Object.keys(data).slice(0, 5);
    console.log('reacts', this.users);
    this.counts = Object.values(data)
      .slice(0, 5)
      .map((x) => x.toLocaleString());
  },
  methods: {},
};
</script>