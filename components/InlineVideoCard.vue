<template>
  <div class="card">
    <div class="ratio ratio-16x9">
      <video
        ref="video"
        playsinline
        controls
        :src="videoLink"
        :poster="thumbnailLink"
        type="video/mp4"
        class="mx-auto"
        style="background-color: black"
        preload="auto"
      >
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
    <NuxtLink :to="videoPlayerLink" class="text-reset text-decoration-none">
      <div id="gallery-card" class="card-body">
        <h5 class="card-title text-truncate pb-1 mb-0">
          {{ title }}
        </h5>
        <h6 v-if="releaseDate" class="card-subtitle">
          <small class="text-muted"> Released {{ releaseDate }}</small>
        </h6>
        <h6 v-if="description" class="card-subtitle mt-1">
          <small class="text-muted">{{ description }}</small>
        </h6>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    videoLink: {
      type: String,
      default: ''
    },
    videoPlayerLink: {
      type: String,
      default: ''
    },
    thumbnailLink: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    releaseDate: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>
