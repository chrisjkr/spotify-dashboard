import qs from 'query-string'
import getTime from 'date-fns/get_time'

export const SAVE_CREDENTIALS = 'SAVE_CREDENTIALS'
export const SAVE_CREDENTIALS_ERROR = 'SAVE_CREDENTIALS_ERROR'
export const REMOVE_CREDENTIALS = 'REMOVE_CREDENTIALS'
export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE'
export const REMOVE_USER_PROFILE = 'REMOVE_USER_PROFILE'
export const RECEIVE_RECENT_TRACKS = 'RECEIVE_RECENT_TRACKS'
export const RECEIVE_TOP_TRACKS = 'RECEIVE_TOP_TRACKS'
export const RECEIVE_TOP_ARTISTS = 'RECEIVE_TOP_ARTISTS'
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA'
export const APPEND_TRACKS = 'APPEND_TRACKS'
export const APPEND_ALBUMS = 'APPEND_ALBUMS'
export const APPEND_ARTISTS = 'APPEND_ARTISTS'

export const saveCredentials = (accessToken, expiresIn) => ({
  type: SAVE_CREDENTIALS,
  isAuthorised: true,
  accessToken,
  expiresIn,
})

export const saveCredentialsError = () => ({
  type: SAVE_CREDENTIALS_ERROR,
  isAuthorised: false,
})

export const removeCredentials = () => ({
  type: REMOVE_CREDENTIALS,
})

export const receiveUserProfile = (profile) => ({
  type: RECEIVE_USER_PROFILE,
  id: profile.id,
  name: profile.display_name,
  imageUrl: profile.images[0].url,
})

export const removeUserProfile = () => ({
  type: REMOVE_USER_PROFILE,
})

export const receiveRecentTracks = (tracks) => ({
  type: RECEIVE_RECENT_TRACKS,
  recentTracks: tracks,
})

export const receiveTopTracks = (tracks) => ({
  type: RECEIVE_TOP_TRACKS,
  topTracks: tracks,
})

export const receiveTopArtists = (artists) => ({
  type: RECEIVE_TOP_ARTISTS,
  topArtists: artists,
})

export const removeUserData = () => ({
  type: REMOVE_USER_DATA,
})

export const appendTracks = (tracks) => ({
  type: APPEND_TRACKS,
  tracks,
})

export const appendAlbums = (albums) => ({
  type: APPEND_ALBUMS,
  albums,
})

export const appendArtists = (artists) => ({
  type: APPEND_ARTISTS,
  artists,
})

/**
 * Appends authorisation header and fetches JSON from url.
 *
 * @param {String} url
 * @param {String} token
 * @returns {Promise<Object>}
 */
const fetchWithAuth = async (url, token) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return await response.json()
}

const shouldFetch = (subState) => {
  const receivedAt = subState.receivedAt
  return !receivedAt || getTime(new Date()) - getTime(receivedAt) > 1000 * 60 * 5;
}

export const fetchUserProfile = () => async (dispatch, getState) => {
  const state = getState()
  if (shouldFetch(state.profile)) {
    try {
      const json = await fetchWithAuth(
        'https://api.spotify.com/v1/me',
        state.credentials.accessToken,
      )
      dispatch(receiveUserProfile(json))
    } catch (err) {
      console.error(err)
    }
  }
}

export const clearUserData = () => async (dispatch) => {
  dispatch(removeCredentials())
  dispatch(removeUserProfile())
  dispatch(removeUserData())
}

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

const parseArtists = (artists) => artists.map(artist => ({
  id: artist.id,
  name: artist.name,
  url: artist.external_urls.spotify,
  imageUrl: artist.images[2].url,
}))

/**
 * Filters passed artist ids and fetches unsaved artists data.
 *
 * @param {Array.<String>} artistIds
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
