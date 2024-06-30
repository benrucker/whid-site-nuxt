<template>
  <component
    :is="navigationUrl.startsWith('http') ? 'a' : 'NuxtLink'"
    class="card mb-4 mx-auto text-reset text-decoration-none"
    style="max-width: 1050px"
    :to="navigationUrl"
    :href="navigationUrl"
  >
    <div class="row g-0">
      <div :class="`col-lg-${thumbnailGridSize}`">
        <div class="ratio ratio-16x9">
          <img :src="thumbnailLink" alt="..." style="max-width: inherit" />
        </div>
      </div>
      <div :class="`col-lg-${12 - thumbnailGridSize}`">
        <div class="card-body">
          <h4 class="card-title">
            {{ title }}
          </h4>
          <h6 class="card-text text-muted">Released {{ releaseDate }}</h6>
          <p class="description mt-4 mb-0">{{ description }}</p>
        </div>
      </div>
    </div>
  </component>
</template>

<script lang="ts">
export default {
  props: {
    navigationUrl: {
      type: String,
      required: true,
    },
    thumbnailLink: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnailGridSize: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.description {
  white-space: pre-wrap;
}
</style>
