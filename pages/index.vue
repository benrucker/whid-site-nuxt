<template>
  <div>
    <div class="container">
      <div
        class="
          header
          mt-5
          d-flex
          justify-content-center
          fw-bold
          align-items-center
        "
      >
        <h1 class="fw-bolder px-2">Hi!</h1>
        <img src="/miniwyatt.png" alt="hi!" class="px-2" />
      </div>

      <div class="welcome mt-5 mb-2 text-center">
        Welcome to <span id="whid">what have i done</span>
      </div>

      <div class="description mt-5 text-center fs-5">
        We are a group of friends who make stupid videos.
      </div>
      <div class="description mt-5 text-end fs-5">...like, really stupid.</div>
    </div>

    <div class="featured mt-5 container">
      <InlineVideoCard
        video-link="/dub/videos/extra/context2.mp4"
        video-player-link="/dub/"
        thumbnail-link="/dub/thumbnails/extra/context2.png"
        title="what have i dubbed Out of Context"
        release-date=""
        description="Click here to see them all!"
      />
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
h1 {
  font-size: 5rem;
}

.welcome {
  font-size: 2rem;
  font-weight: bold;
}

#whid {
  position: relative;
  margin: 0.1em;
}

#whid:before {
  content: "";
  z-index: -1;
  left: 0.1em;
  top: 0.9em;
  background-color: var(--bs-primary);
  position: absolute;
  width: 100%;
  height: 25%;
}

.description {
}
</style>