<template>
  <a :href="videoLink" class="text-reset text-decoration-none">
    <div class="card">
      <div class="ratio ratio-16x9">
        <img :src="thumbnailLink" class="card-img-top" :alt="title" />
      </div>
      <div class="card-body" id="gallery-card">
        <h5 class="card-title text-truncate pb-1 mb-0">
          {{ title }}
        </h5>
        <h6 class="card-subtitle" v-if="releaseDate">
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
    releaseDate: String,
  },
};
</script>