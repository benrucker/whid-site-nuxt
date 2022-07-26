<template>
  <div>
    This is where the new stuff go
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line require-await
  async asyncData ({ params }) {
    return {
      username: params.username
    }
  },
  data () {
    return {
    }
  },
  async fetch () {},
  async mounted () {
  },
  methods: {}
}
</script>

<style>
</style>
