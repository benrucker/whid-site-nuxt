<template>
  <div>
    <Whyd2021Top5
      :names="users"
      :counts="counts"
      :unit="'Emojis'"
      :emojis="true"
      :url-prefix="urlPrefix"
    />
  </div>
</template>

<script>
export default {
  props: {
    urlPrefix: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      users: [],
      counts: []
    }
  },
  async mounted() {
    const data = await fetch(`${this.urlPrefix}/serverEmojis.json`).then(
      (res) => res.json()
    )
    data["(':shred:',)"] += data["(':trueshred:',)"]
    delete data["(':trueshred:',)"]

    const sorted = []
    for (const emoji in data) {
      sorted.push([emoji, data[emoji]])
    }
    sorted.sort((a, b) => b[1] - a[1])

    this.users = sorted.slice(0, 5).map((x) => x[0].replace(/\(|\)|,|\'/g, ''))
    this.counts = sorted.slice(0, 5).map((x) => x[1].toLocaleString())
  },
  methods: {}
}
</script>
