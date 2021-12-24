<template>
  <div>
    <WhydTop5
      :names="users"
      :counts="counts"
      :unit="'Emojis'"
      :emojis="true"
      :urlPrefix="urlPrefix"
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
    let data = await fetch(`${this.urlPrefix}/serverEmojis.json`).then((res) =>
      res.json()
    );
    data["(':shred:',)"] += data["(':trueshred:',)"];
    delete data["(':trueshred:',)"];

    let sorted = [];
    for (let emoji in data) {
      sorted.push([emoji, data[emoji]]);
    }
    sorted.sort((a, b) => b[1] - a[1]);

    this.users = sorted.slice(0, 5).map((x) => x[0].replace(/\(|\)|,|\'/g, ""));
    console.log('emojis', this.users);
    this.counts = sorted.slice(0, 5).map((x) => x[1].toLocaleString());
  },
  methods: {},
};
</script>