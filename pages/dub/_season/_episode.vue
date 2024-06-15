<template>
  <div>
    <div id="playerApp" class="container mt-5">
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
        <a href="javascript:void(0)" @click="goToPart(part)"
          >Part {{ index + 1 }}</a
        >: {{ part.members }}
      </p>
      <br />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Catalog, Episode, Part } from '~/types/catalogTypes';
import { isSeasonName, SeasonName } from '~/types/SeasonName';
import { CATALOG } from '~/utils/catalog';
import { goToGallery } from '~/utils/goToGallery';

interface State {
  catalog: Catalog;
  epData: Episode | undefined;
  episode: string;
  loaded: boolean;
  parts: ReadonlyArray<Part> | undefined;
  releaseDate: string | undefined;
  season: SeasonName;
  thumbnailURL: string;
  time: number;
  title: string;
  videoURL: string;
}

export default Vue.extend({
  layout: 'dub-layout',
  // eslint-disable-next-line require-await
  async asyncData({
    params,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    redirect,
  }): Promise<{ season: SeasonName; episode: string }> {
    const season = params.season;
    const episode = params.episode;

    if (
      !isSeasonName(season) ||
      CATALOG.seasons[season].episodes.find(({ id }) => id === episode) == null
    ) {
      goToGallery(redirect);
      throw new VideoIDError(`Unknown episode ${season} ${episode}`);
    }

    return {
      season,
      episode,
    };
  },
  data(): State {
    return {
      catalog: CATALOG,
      epData: undefined,
      episode: '',
      loaded: false,
      parts: [],
      releaseDate: '',
      season: 's1',
      thumbnailURL: '',
      time: 0,
      title: '',
      videoURL: '',
    };
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
        ['og:video:height', '720'],
      ].map(([name, content]) => {
        return {
          hid: name,
          property: name,
          content,
        };
      }),
    };
  },
  computed: {
    video(): HTMLVideoElement | null {
      return this.$refs.video as HTMLVideoElement | null;
    },
  },
  watch: {
    // eslint-disable-next-line require-await
    async loaded() {
      document.title = 'Watching ' + this.title;
      const setInitialState = () => {
        try {
          if (this.video != null) {
            this.video.volume = 0.4;
          }
          if (this.time) {
            this.goToTime(this.time);
          }
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      };
      const interval = () =>
        setTimeout(() => {
          if (setInitialState()) {
            // pass
          } else {
            setTimeout(interval, 50);
          }
        }, 50);
      interval();
    },
  },
  mounted() {
    this.time = Number(this.$nuxt.context.query.t?.toString());
    this.epData = getVideoDataFromID(this.catalog, this.season, this.episode);

    this.thumbnailURL = constructThumbnailURL(this.season, this.episode);
    this.videoURL = constructVideoURL(this.season, this.episode);
    this.title = this.epData.title;
    this.releaseDate = constructDate(this.epData);
    this.parts = this.epData.parts;

    this.loaded = true;
  },
  methods: {
    goToPart(part: Part) {
      this.goToTime(convertTimestampToSeconds(part.timestamp));
    },
    goToTime(time: number) {
      if (this.video != null) {
        this.video.currentTime = time;
      }
    },
  },
});

class VideoIDError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VideoIDError';
  }
}

function getVideoDataFromID(catalog: Catalog, season: SeasonName, id: string) {
  const episodes = getEpisodesFromSeason(catalog, season);
  return getEpisodeFromList(episodes, id);
}

function getEpisodesFromSeason(catalog: Catalog, season: SeasonName) {
  return catalog.seasons[season].episodes;
}

function getEpisodeFromList(episodes: ReadonlyArray<Episode>, epid: string) {
  for (const episode of episodes) {
    if (episode.id === epid) {
      return episode;
    }
  }
  throw new VideoIDError('Video ID not found in catalog');
}

function constructVideoURL(season: SeasonName, episode: string) {
  return 'https://12b3.pw/whid/videos/' + season + '/' + episode + '.mp4';
}

function constructThumbnailURL(season: SeasonName, episode: string) {
  return 'https://12b3.pw/whid/thumbnails/' + season + '/' + episode + '.png';
}

function constructDate(ep: Episode) {
  return ep.releaseDate;
}

function convertTimestampToSeconds(timestamp: string) {
  const [min, sec] = timestamp.split(':').map((x) => Number(x));
  return min * 60 + sec;
}

function getMajorColor() {
  const cols = ['#ffd294', '#a3eff7', '#fcaecf', '#bda6ff'];
  return cols[getRandomInt(cols.length)];
}

function getRandomInt(total: number) {
  const newNum = Math.floor(Math.random() * (total - 1));
  return newNum;
}
</script>
