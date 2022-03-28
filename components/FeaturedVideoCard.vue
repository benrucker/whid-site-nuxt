<template>
  <a
    class="card mb-4 mx-auto text-reset text-decoration-none"
    style="max-width: 1050px"
    :href="videoLink"
  >
    <div class="row g-0">
      <div class="col-lg-6">
        <div class="ratio ratio-16x9">
          <img
            :src="thumbnailLink"
            alt="..."
            style="max-width: inherit"
          />
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card-body">
          <h4 class="card-title">{{ title }}</h4>
          <h6 class="card-text text-muted">Released {{ releaseDate }}</h6>
          <p class="mt-4 mb-0">{{ description }}</p>
        </div>
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
    description: String,
  },
};
</script>
