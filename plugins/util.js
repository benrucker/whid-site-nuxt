const jsonPath = 'catalog.json'
let catalog

console.log('hi, this is the static pathway through util.js')

class VideoIDError extends Error {
  constructor(message) {
    super(message)
    this.name = 'VideoIDError'
  }
}

async function initCatalog() {
  await loadCatalog()
  for (const seasonID in catalog.seasons) {
    const season = catalog.seasons[seasonID]
    season.episodes.apply(function (x) {
      x.season = seasonID
    })
  }
}

async function loadCatalog() {
  const request = async () => {
    const response = await fetch(jsonPath)
    catalog = await response.json()
  }
  await request()
}

function getSeasons() {
  // called outside of file
  return catalog.seasons
}

function getFeaturedVideo() {
  const [season, id, desc] = getFeaturedVideoData()
  const data = getVideoDataFromID(season, id)
  return [data, desc]
}

function getFeaturedVideoData() {
  return [
    catalog.featured.season,
    catalog.featured.id,
    catalog.featured.description
  ]
}

function getVideoDataFromID(season, id) {
  const episodes = getEpisodesFromSeason(season)
  const episode = getEpisodeFromList(episodes, id)
  console.log(episode)
  return episode
}

function getEpisodesFromSeason(season) {
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

function constructWatchURL(ep) {
  return 'watch.php?s=' + ep.season + '&e=' + ep.id
}

function constructVideoURL(ep) {
  return 'resources/videos/' + ep.season + '/' + ep.id + '.mp4'
}

function constructThumbnailURL(ep) {
  return 'resources/thumbnails/' + ep.season + '/' + ep.id + '.png'
}

function constructDate(ep) {
  return ep.releaseDate
}

function goToGallery() {
  window.location.replace('../dub/?error=true')
}

function getErrorFromURL() {
  return Boolean(getParamFromURL('error'))
}

function getSeasonAndEpisodeFromURL() {
  const season = getParamFromURL('s')
  const ep = getParamFromURL('e')
  if (season === null || ep === null) {
    throw new VideoIDError('No ID supplied in URL')
  }
  return [season, ep]
}

function getTimestampFromURL() {
  const time = getParamFromURL('t')
  if (time != null && time < 0) {
    throw new VideoIDError('Invalid timestamp')
  }
  return time
}

function getParamFromURL(key) {
  const params = getParamsFromURL()
  const param = params.get(key)
  return param
}

function getParamsFromURL() {
  const uri = window.location.search.substring(1)
  const params = new URLSearchParams(uri)
  return params
}

export default {
  initCatalog,
  getSeasons,
  getFeaturedVideo,
  getVideoDataFromID,
  constructWatchURL,
  constructVideoURL,
  constructThumbnailURL,
  constructDate,
  goToGallery,
  getErrorFromURL,
  getSeasonAndEpisodeFromURL,
  getTimestampFromURL,
  getParamFromURL,
  getParamsFromURL
}
