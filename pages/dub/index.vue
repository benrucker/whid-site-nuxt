<template>
  <div>
    <div v-cloak id="galleryApp">
      <div v-if="showAlert" class="container">
        <div
          class="alert alert-info alert-dismissible fade show m-2"
          role="alert"
        >
          <strong>Error:</strong> Invalid video ID
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          />
        </div>
      </div>
      <p v-if="$fetchState.pending" />
      <section v-else>
        <section v-if="featured">
          <h3 class="text-center mt-4">
            Featured Video
          </h3>
          <div class="container">
            <FeaturedVideoCard
              v-if="featured"
              :video-link="watchFeatured()"
              :thumbnail-link="thumbnailFeatured()"
              :title="title(featured)"
              :release-date="date(featured)"
              :description="featuredDesc"
            />
          </div>
        </section>

        <h3 class="text-center mt-4">
          Episodes
        </h3>

        <div class="container d-flex mt-3 mb-3">
          <div
            class="btn-group mx-auto"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <template v-for="season in Object.keys(seasons)">
              <input
                :id="season"
                :key="season"
                v-model="activeSeason"
                type="radio"
                class="btn-check"
                name="btnradio"
                :value="season"
                autocomplete="off"
              >
              <label
                :key="season.id"
                class="btn btn-outline-primary"
                :for="season"
              >{{ seasons[season].name }}</label>
            </template>
          </div>
        </div>

        <div class="container mt-1">
          <div v-if="seasons[activeSeason]">
            <div class="row">
              <VideoCard
                v-for="episode in seasons[activeSeason]['episodes']"
                :key="episode['title']"
                class="col-md-6 col-lg-3 my-3 mt-1"
                :video-link="video(episode)"
                :thumbnail-link="thumbnail(episode)"
                :title="title(episode)"
                :release-date="date(episode)"
              />
              <NoVideosPlaceholder
                v-if="seasons[activeSeason]['episodes'].length === 0"
                class="text-center mt-5"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dub-layout',
  data () {
    return {
      catalog: null,
      activeSeason: 's1',
      seasons: {},
      showAlert: false,
      featured: null,
      featuredDesc: ''
    }
  },
  async fetch () {
    this.catalog = await this.$nuxt.$content('catalog').fetch()
    addSeasonToEpisodes(this.catalog)
    this.seasons = getSeasons(this.catalog)
    this.showAlert = this.$nuxt.context.query.error;
    [this.featured, this.featuredDesc] = getFeaturedVideo(this.catalog)
  },
  async mounted () {},
  methods: {
    title (episode) {
      return episode.title
    },
    date (episode) {
      return constructDate(episode)
    },
    thumbnail (episode) {
      return constructThumbnailURL(episode)
    },
    video (episode) {
      return constructWatchURL(episode)
    },
    thumbnailFeatured () {
      return constructThumbnailURL(this.featured)
    },
    watchFeatured () {
      return constructWatchURL(this.featured)
    }
  }
}

class VideoIDError extends Error {
  constructor (message) {
    super(message)
    this.name = 'VideoIDError'
  }
}

function addSeasonToEpisodes (catalog) {
  for (const seasonID in catalog.seasons) {
    const season = catalog.seasons[seasonID]
    season.episodes.map(x => (x.season = seasonID))
  }
}

function getSeasonByID (seasonID) {
  return getSeasons()[seasonID]
}

function getSeasons (catalog) {
  return catalog.seasons
}

function getFeaturedVideo (catalog) {
  const [season, id, desc] = getFeaturedVideoData(catalog)
  const data = getVideoDataFromID(catalog, season, id)
  return [data, desc]
}

function getFeaturedVideoData (catalog) {
  return [
    catalog.featured.season,
    catalog.featured.id,
    catalog.featured.description
  ]
}

function getVideoDataFromID (catalog, season, id) {
  const episodes = getEpisodesFromSeason(catalog, season)
  const episode = getEpisodeFromList(episodes, id)
  return episode
}

function getEpisodesFromSeason (catalog, season) {
  return catalog.seasons[season].episodes
}

function getEpisodeFromList (episodes, epid) {
  for (const episode of episodes) {
    if (episode.id === epid) {
      return episode
    }
  }
  throw new VideoIDError('Video ID not found in catalog')
}

function constructWatchURL (ep) {
  return '/dub/' + ep.season + '/' + ep.id + ''
}

function constructVideoURL (ep) {
  return '/dub/videos/' + ep.season + '/' + ep.id + '.mp4'
}

function constructThumbnailURL (ep) {
  return '/dub/thumbnails/' + ep.season + '/' + ep.id + '.png'
}

function constructDate (ep) {
  return ep.releaseDate
}
</script>
