<template>
  <div>
    <NuxtLink to="/dub">Back to Gallery</NuxtLink>
    <div class="container mt-5" id="playerApp" v-cloak>
      <div class="text-center ratio ratio-16x9">
        <video
          playsinline
          controls
          :src="videoURL"
          :poster="thumbnailURL"
          type="video/mp4"
          class="mx-auto"
          style="background-color: black"
          ref="video"
          preload="auto"
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
      <h2 class="fw-bold mb-0 mt-1">{{ title }}</h2>
      <p class="text-muted" v-if="releaseDate">Released {{ releaseDate }}</p>

      <p class="mb-0" v-for="(part, index) in parts" :key="index">
        <a @click="goToPart(index)" href="javascript:void(0)"
          >Part {{ index + 1 }}</a
        >: {{ part.members }}
      </p>
      <br />
    </div>
  </div>
</template>
<script>
export default {
  layout: "dub-layout",
  async asyncData({ params, redirect }) {
    this.season = params.season;
    this.episode = params.episode;

    return {
      season: season,
      episode: episode,
    };
  },
  data() {
    return {
      title: "",
      releaseDate: "",
      videoURL: "",
      thumbnailURL: "",
      parts: [],
      season: "",
      episode: "",
    };
  },
  async mounted() {
    await initCatalog();
    try {
      await this.setupPage();
    } catch (err) {
      if (err instanceof VideoIDError) goToGallery();
      else throw err;
    }
  },
  methods: {
    async setupPage() {
      let [season, id] = getSeasonAndEpisodeFromURL();
      let ep = getVideoDataFromID(season, id);

      this.thumbnailURL = constructThumbnailURL(ep);
      this.videoURL = constructVideoURL(ep);
      this.title = ep["title"];
      this.releaseDate = constructDate(ep);
      this.parts = ep["parts"];

      document.title = "Watching " + this.title;
      this.$refs.video.volume = 0.4;

      let time = getTimestampFromURL();
      if (time) this.goToTime(time);
    },
    goToPart(partIndex) {
      this.goToTime(
        convertTimestampToSeconds(this.parts[partIndex]["timestamp"])
      );
    },
    goToTime(time) {
      this.$refs.video.currentTime = time;
    },
  },
};
</script>
