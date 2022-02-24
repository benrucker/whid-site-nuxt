<template>
  <a :href="videoLink" class="text-reset text-decoration-none">
    <div class="card">
      <div class="ratio ratio-16x9">
        <img :src="thumbnailLink" class="card-img-top" :alt="title">
      </div>
      <div id="gallery-card" class="card-body">
        <h5 class="card-title text-truncate pb-1 mb-0">
          {{ title }}
        </h5>
        <h6 v-if="releaseDate" class="card-subtitle">
          <small class="text-muted"> Released {{ releaseDate }}</small>
        </h6>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    videoLink: String,
    thumbnailLink: String,
    title: String,
    releaseDate: String
  }
}
</script>
