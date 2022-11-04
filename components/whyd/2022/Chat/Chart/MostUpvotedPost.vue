<template>
  <div>most upvoted post</div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
