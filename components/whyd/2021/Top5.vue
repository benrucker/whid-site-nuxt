<template>
  <div class="mb-4">
    <div class="title text-center">
      {{ unit }}
    </div>
    <div v-for="(name, i) in names" :key="name" class="row align-items-center">
      <span :class="'col-2 close rank text-center fadein-' + (i + 5)">{{
        i + 1
      }}</span>
      <span :class="'col-6 close name fadein-' + (i + 10)"
        ><Whyd2021Emoji
          v-if="emojis"
          :url-prefix="urlPrefix"
          :emoji="name"
          :big="true"
        />
        <span v-else>{{ name }}</span></span
      >
      <span :class="'col-4 close count text-center fadein-' + i">{{
        counts[i]
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    names: [],
    counts: [],
    unit: '',
    emojis: false,
    urlPrefix: ''
  },
  async mounted() {},
  methods: {}
}
</script>

<style scoped>
div {
  width: 100%;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: -1rem;
  font-style: italic;
}

.close {
  margin-bottom: -2rem;
}

.rank {
  font-weight: bold;
  font-style: italic;
  font-size: 5rem;
}
.name {
  font-size: 2rem;
}
.count {
  font-style: italic;
  font-size: 3rem;
}

.unit {
  font-size: 2rem;
}
</style>
