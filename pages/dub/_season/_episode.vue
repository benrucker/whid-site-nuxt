<template>
  <div>
    <div v-if="$fetchState.pending" id="playerApp" class="container mt-5" />
    <div v-else id="playerApp" class="container mt-5">
      <div class="text-center ratio ratio-16x9">
        <video
          ref="video"
          playsinline
          controls
          :src="videoURL"
          :poster="thumbnailURL"
          type="video/mp4"
          class="mx-auto"
          style="background-color: black"
          preload="auto"
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
      <h2 class="fw-bold mb-0 mt-1">
        {{ title }}
      </h2>
      <p v-if="releaseDate" class="text-muted">Released {{ releaseDate }}</p>

      <p v-for="(part, index) in parts" :key="index" class="mb-0">
        <a href="javascript:void(0)" @click="goToPart(index)"
          >Part {{ index + 1 }}</a
        >: {{ part.members }}
      </p>
      <br />
    </div>
  </div>
</template>
<script>
export default {
  layout: 'dub-layout',
  // eslint-disable-next-line require-await, @typescript-eslint/no-unused-vars
  async asyncData({ params, redirect }) {
    const season = params.season
    const episode = params.episode

    return {
      season,
      episode
    }
  },
  data() {
    return {
      title: '',
      releaseDate: '',
      videoURL: '',
      thumbnailURL: '',
      parts: [],
      catalog: null,
      epData: null,
      time: 0,
      loaded: false
    }
  },
  async fetch() {
    this.time = this.$nuxt.context.query.t
    this.catalog = await this.$nuxt.$content('catalog').fetch()
    try {
      this.epData = getVideoDataFromID(this.catalog, this.season, this.episode)

      this.thumbnailURL = constructThumbnailURL(this.season, this.episode)
      this.videoURL = constructVideoURL(this.season, this.episode)
      this.title = this.epData.title
      this.releaseDate = constructDate(this.epData)
      this.parts = this.epData.parts
    } catch (err) {
      if (err instanceof VideoIDError) {
        goToGallery()
      } else {
        throw err
      }
    }
    this.loaded = true
  },
  head() {
    return {
      title: 'Watching ' + this.title,
      meta: [
        ['theme-color', getMajorColor()],
        ['og:site_name', 'whid.live'],
        ['og:url', this.videoURL],
        ['og:title', this.title],
        ['og:image', this.thumbnailURL],
        ['og:image:width', '1280'],
        ['og:image:height', '720'],
        ['og:description', 'Watch what have i dubbed'],
        ['og:type', 'video.other'],
        ['og:video:url', this.videoURL],
        ['og:video:secure_url', this.videoURL],
        ['og:video:type', 'text/html'],
        ['og:video:width', '1280'],
        ['og:video:height', '720']
      ].map(([name, content]) => {
        return {
          hid: name,
          property: name,
          content
        }
      })
    }
  },
  watch: {
    // eslint-disable-next-line require-await
    async loaded() {
      document.title = 'Watching ' + this.title
      const setInitialState = () => {
        try {
          this.$refs.video.volume = 0.4
          if (this.time) {
            this.goToTime(this.time)
          }
          return true
        } catch (err) {
          console.log(err)
          return false
        }
      }
      const interval = () =>
        setTimeout(() => {
          if (setInitialState()) {
            // pass
          } else {
            setTimeout(interval, 50)
          }
        }, 50)
      interval()
    }
  },
  async mounted() {
    await this.setupPage()
  },
  methods: {
    async setupPage() {},
    goToPart(partIndex) {
      this.goToTime(convertTimestampToSeconds(this.parts[partIndex].timestamp))
    },
    goToTime(time) {
      this.$refs.video.currentTime = time
    }
  }
}

class VideoIDError extends Error {
  constructor(message) {
    super(message)
    this.name = 'VideoIDError'
  }
}

function getVideoDataFromID(catalog, season, id) {
  const episodes = getEpisodesFromSeason(catalog, season)
  const episode = getEpisodeFromList(episodes, id)
  return episode
}

function getEpisodesFromSeason(catalog, season) {
  return catalog.seasons[season].episodes
}

function getEpisodeFromList(episodes, epid) {
  for (const episode of episodes) {
    if (episode.id === epid) {
      return episode
    }
  }
  throw new VideoIDError('Video ID not found in catalog')
}

function constructVideoURL(season, episode) {
  return 'https://12b3.pw/whid/videos/' + season + '/' + episode + '.mp4'
}

function constructThumbnailURL(season, episode) {
  return 'https://12b3.pw/whid/thumbnails/' + season + '/' + episode + '.png'
}

function constructDate(ep) {
  return ep.releaseDate
}

function convertTimestampToSeconds(timestamp) {
  const [min, sec] = timestamp.split(':').map((x) => Number(x))
  return min * 60 + sec
}

function getMajorColor() {
  const cols = ['#ffd294', '#a3eff7', '#fcaecf', '#bda6ff']
  return cols[getRandomInt(cols.length)]
}

function getRandomInt(total) {
  const newNum = Math.floor(Math.random() * (total - 1))
  return newNum
}
</script>
