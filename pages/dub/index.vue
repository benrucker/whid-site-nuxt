<template>
  <div>
    <div v-cloak id="galleryApp">
      <div v-if="showAlert" class="container">
        <div class="alert alert-danger fade show m-2" role="alert">
          <strong>Error:</strong> Invalid video ID
        </div>
      </div>
      <section>
        <section v-if="featured">
          <h3 class="text-center mt-4">Featured Video</h3>
          <div class="container">
            <DubFeaturedVideoCard
              v-if="featured"
              :video-link="watchFeatured()"
              :thumbnail-link="thumbnailFeatured()"
              :title="title(featured)"
              :release-date="date(featured)"
              :description="featured.description"
            />
          </div>
        </section>

        <h3 class="text-center mt-4">Episodes</h3>

        <div class="container d-flex mt-3 mb-3">
          <div
            class="btn-group mx-auto"
            role="group"
            aria-label="Change seasons"
          >
            <template v-for="[seasonName, season] in Object.entries(seasons)">
              <input
                :id="seasonName"
                :key="seasonName + 'input'"
                v-model="activeSeason"
                type="radio"
                class="btn-check"
                name="btnradio"
                :value="seasonName"
                autocomplete="off"
              />
              <label
                :key="seasonName + 'label'"
                class="btn btn-outline-primary"
                :for="seasonName"
                >{{ season.name }}</label
              >
            </template>
          </div>
        </div>

        <div class="container mt-1">
          <div v-if="seasons[activeSeason] != null">
            <div class="row">
              <DubVideoCard
                v-for="episode in sortEpisodes(
                  seasons[activeSeason].episodes,
                  activeSeason,
                )"
                :key="episode['title']"
                class="col-md-6 col-lg-3 my-3 mt-1"
                :video-link="video(episode, activeSeason)"
                :thumbnail-link="thumbnail(episode, activeSeason)"
                :title="title(episode)"
                :release-date="date(episode)"
              />
              <DubNoVideosPlaceholder
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

<script lang="ts">
import Vue from 'vue';
import { Catalog, Episode, FeaturedVideo } from '~/types/catalogTypes';
import { SeasonById } from '~/types/SeasonById';
import { SeasonName } from '~/types/SeasonName';
import { CATALOG } from '~/utils/catalog';

interface State {
  catalog: Catalog;
  activeSeason: SeasonName;
  seasons: SeasonById;
  showAlert: boolean;
  featured: FeaturedVideo & Episode;
  scrollPosition: number;
}

export default Vue.extend({
  layout: 'dub-layout',
  data(): State {
    return {
      catalog: CATALOG,
      activeSeason: 's1',
      seasons: CATALOG.seasons,
      showAlert: false,
      featured: getFeaturedVideo(CATALOG),
      scrollPosition: 0,
    } as const;
  },
  fetch(): void {
    this.showAlert = this.$nuxt.context.query.error != null;
  },
  watch: {
    activeSeason: saveActiveSeason,
    scrollPosition: saveScrollPosition,
  } as const,
  mounted(): void {
    // TODO: Use runtypes to verify this
    this.activeSeason = (localStorage.getItem('activeSeason') ??
      's1') as SeasonName;
    setTimeout(() => {
      window.scrollTo({
        top: Number(localStorage.getItem('scrollPosition')),
      });
      setInterval(() => {
        this.scrollPosition = window.scrollY;
      }, 50);
    }, 100);
  },
  methods: {
    title(episode: Episode): string {
      return episode.title;
    },
    date(episode: Episode): string | undefined {
      return constructDate(episode);
    },
    thumbnail(episode: Episode, seasonName: SeasonName): string {
      return constructThumbnailURL(episode, seasonName);
    },
    video(episode: Episode, seasonName: SeasonName): string {
      return constructWatchURL(episode, seasonName);
    },
    thumbnailFeatured(): string {
      return constructThumbnailURL(this.featured, this.featured.season);
    },
    watchFeatured(): string {
      return constructWatchURL(this.featured, this.featured.season);
    },
    sortEpisodes(
      episodes: ReadonlyArray<Episode>,
      season: SeasonName,
    ): ReadonlyArray<Episode> {
      return sortEpisodes(episodes, season);
    },
  },
});

class VideoIDError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VideoIDError';
  }
}

function saveActiveSeason(newValue: SeasonName): void {
  localStorage.setItem('activeSeason', newValue);
}
function saveScrollPosition(newValue: number): void {
  localStorage.setItem('scrollPosition', String(newValue));
}

function getFeaturedVideo(catalog: Catalog): FeaturedVideo & Episode {
  const data = getVideoDataFromID(
    catalog,
    catalog.featured.season,
    catalog.featured.id,
  );
  return {
    ...catalog.featured,
    ...data,
  };
}

function getVideoDataFromID(catalog: Catalog, season: SeasonName, id: string) {
  const episodes = getEpisodesFromSeason(catalog, season);
  const episode = getEpisodeFromList(episodes, id);
  return episode;
}

function getEpisodesFromSeason(catalog: Catalog, season: SeasonName) {
  return catalog.seasons[season].episodes;
}

function sortEpisodes(
  episodes: ReadonlyArray<Episode>,
  seasonName: SeasonName,
) {
  if (seasonName === 'extra') {
    return [...episodes].reverse();
  }
  return episodes;
}

function getEpisodeFromList(episodes: ReadonlyArray<Episode>, epid: string) {
  for (const episode of episodes) {
    if (episode.id === epid) {
      return episode;
    }
  }
  throw new VideoIDError('Video ID not found in catalog');
}

function constructWatchURL(ep: Episode, season: SeasonName) {
  return '/dub/' + season + '/' + ep.id + '';
}

function constructThumbnailURL(ep: Episode, season: SeasonName) {
  return 'https://12b3.pw/whid/thumbnails/' + season + '/' + ep.id + '.png';
}

function constructDate(ep: Episode) {
  return ep.releaseDate;
}
</script>
