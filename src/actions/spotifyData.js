import { fetchWithAuth, shouldFetch } from './index'
import qs from 'query-string'

export const RECEIVE_RECENT_TRACKS = 'RECEIVE_RECENT_TRACKS'
export const RECEIVE_TOP_TRACKS = 'RECEIVE_TOP_TRACKS'
export const RECEIVE_TOP_ARTISTS = 'RECEIVE_TOP_ARTISTS'
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA'
export const APPEND_TRACKS = 'APPEND_TRACKS'
export const APPEND_ALBUMS = 'APPEND_ALBUMS'
export const APPEND_ARTISTS = 'APPEND_ARTISTS'

/**
 *
 * @param {array.<object>} tracks
 */
export const receiveRecentTracks = (tracks) => ({
  type: RECEIVE_RECENT_TRACKS,
  recentTracks: tracks,
})

/**
 * @param {array.<object>} tracks
 */
export const receiveTopTracks = (tracks) => ({
  type: RECEIVE_TOP_TRACKS,
  topTracks: tracks,
})

/**
 * @param {array.<object>} artists
 */
export const receiveTopArtists = (artists) => ({
  type: RECEIVE_TOP_ARTISTS,
  topArtists: artists,
})

export const removeUserData = () => ({
  type: REMOVE_USER_DATA,
})

/**
 * @param {array.<object>} tracks
 */
export const appendTracks = (tracks) => ({
  type: APPEND_TRACKS,
  tracks,
})

/**
 * @param {array.<object>} albums
 */
export const appendAlbums = (albums) => ({
  type: APPEND_ALBUMS,
  albums,
})

/**
 * @param {array.<object>} artists
 */
export const appendArtists = (artists) => ({
  type: APPEND_ARTISTS,
  artists,
})

/**
 * Fetches recently played tracks.
 */
export const fetchRecentTracks = () => async (dispatch, getState) => {
  const state = getState()
  if (shouldFetch(state.spotifyData.recentTracks))
    try {
      const json = await fetchWithAuth(
        'https://api.spotify.com/v1/me/player/recently-played',
        state.credentials.accessToken,
      )
      const tracks = json.items.map(item => ({
        id: item.track.id,
        playedAt: item.played_at,
      }))
      dispatch(receiveRecentTracks(tracks))
      const recentTrackIds = tracks.map(track => track.id)
      dispatch(fetchUnsavedTracks(recentTrackIds))
    } catch (err) {
      console.error(err)
    }
}

const parseTracks = (tracks) => tracks.map(track => {
  const artistIds = track.artists.map(artist => artist.id)

  return {
    id: track.id,
    title: track.name,
    url: track.external_urls.spotify,
    artistIds,
    albumId: track.album.id,
  }
})

// const fetchUnsavedEntities = (entityIds, entityName, parseFunction, appendFunction)

/**
 * Filters passed track ids and fetches unsaved track data.
 *
 * @param {Array.<String>} trackIds
 */
export const fetchUnsavedTracks = (trackIds) => async (dispatch, getState) => {
  const state = getState()
  const savedTracks = state.spotifyData.tracks
  const unsavedTracks = trackIds.filter((trackId, index, self) => (
    self.indexOf(trackId) === index && !savedTracks.hasOwnProperty(trackId))
  )

  if (unsavedTracks.length) {
    const trackIdsString = unsavedTracks.join(',')
    try {
      const json = await fetchWithAuth(
        `https://api.spotify.com/v1/tracks/?ids=${trackIdsString}`,
        state.credentials.accessToken,
      )
      const tracks = parseTracks(json.tracks)
      const albumIds = tracks.map(track => track.albumId)
      dispatch(appendTracks(tracks))
      dispatch(fetchUnsavedAlbums(albumIds))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * Parses received album data.
 *
 * @param {array.<object>} albums
 */
const parseAlbums = (albums) => albums.map(album => {
  const artistIds = album.artists.map(artist => artist.id)
  return {
    id: album.id,
    name: album.name,
    imageUrl: album.images[1].url,
    artistIds,
  }
})

/**
 * Filters passed album ids and fetches unsaved albums data.
 *
 * @param {Array.<String>} albumIds
 */
const fetchUnsavedAlbums = (albumIds) => async (dispatch, getState) => {
  const state = getState()
  const savedAlbums = state.spotifyData.albums
  const unsavedAlbums = albumIds.filter((albumId, index, self) => (
    self.indexOf(albumId) === index && !savedAlbums.hasOwnProperty(albumId))
  )

  if (unsavedAlbums.length) {
    const albumIdsString = unsavedAlbums.join(',')
    try {
      const json = await fetchWithAuth(
        `https://api.spotify.com/v1/albums/?ids=${albumIdsString}`,
        state.credentials.accessToken,
      )
      const albums = parseAlbums(json.albums)
      dispatch(appendAlbums(albums))
      let artistIds = [].concat.apply([], albums.map(album => album.artistIds))
      dispatch(fetchUnsavedArtists(artistIds))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * Parses received artists data.
 *
 * @param {array.<object>} artists
 */
const parseArtists = (artists) => artists.map(artist => ({
  id: artist.id,
  name: artist.name,
  url: artist.external_urls.spotify,
  imageUrl: artist.images[2].url,
}))

/**
 * Filters passed artist ids and fetches unsaved artists data.
 *
 * @param {array.<string>} artistIds
 */
const fetchUnsavedArtists = (artistIds) => async (dispatch, getState) => {
  const state = getState()
  const savedArtists = state.spotifyData.artists
  const unsavedArtists = artistIds.filter((artistId, index, self) => (
    self.indexOf(artistId) === index && !savedArtists.hasOwnProperty(artistId))
  )

  if (unsavedArtists.length) {
    const artistIdsString = unsavedArtists.join(',')
    try {
      const json = await fetchWithAuth(
        `https://api.spotify.com/v1/artists/?ids=${artistIdsString}`,
        state.credentials.accessToken,
      )
      const artists = parseArtists(json.artists)
      return dispatch(appendArtists(artists))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * Fetches user's most played tracks.
 */
export const fetchTopTracks = () => async (dispatch, getState) => {
  const state = getState()
  if (shouldFetch(state.spotifyData.topTracks)) {
    try {
      const params = {
        time_range: 'long_term',
      }
      const json = await fetchWithAuth(
        `https://api.spotify.com/v1/me/top/tracks/?${qs.stringify(params)}`,
        state.credentials.accessToken,
      )
      const tracks = parseTracks(json.items)
      dispatch(receiveTopTracks(tracks))
      const trackIds = tracks.map(track => track.id)
      dispatch(fetchUnsavedTracks(trackIds))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * Fetches user's most played artists.
 */
export const fetchTopArtists = () => async (dispatch, getState) => {
  const state = getState()
  if (shouldFetch(state.spotifyData.topArtists)) {
    try {
      const params = {
        time_range: 'long_term',
      }
      const json = await fetchWithAuth(
        `https://api.spotify.com/v1/me/top/artists/?${qs.stringify(params)}`,
        state.credentials.accessToken,
      )
      const artists = json.items.map(artist => ({ id: artist.id }))
      dispatch(receiveTopArtists(artists))
      const artistIds = artists.map(artist => artist.id)
      dispatch(fetchUnsavedArtists(artistIds))
    } catch (err) {
      console.error(err)
    }
  }
}
