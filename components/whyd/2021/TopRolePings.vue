<template>
  <div>
    <Whyd2021Top5 :names="users" :counts="counts" :unit="'Role Pings'" />
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
    const data = await fetch(`${this.urlPrefix}/roleMentions.json`).then(
      (res) => res.json()
    )
    this.users = Object.keys(data).slice(0, 5)
    this.counts = Object.values(data)
      .slice(0, 5)
      .map((x) => x.toLocaleString())
  },
  methods: {}
}
</script>
