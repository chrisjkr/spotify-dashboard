import { combineReducers } from 'redux'
import {
  SAVE_CREDENTIALS,
  SAVE_CREDENTIALS_ERROR,
  RECEIVE_USER_PROFILE,
  RECEIVE_RECENT_TRACKS,
  RECEIVE_TOP_TRACKS,
  RECEIVE_TOP_ARTISTS,
  APPEND_TRACKS,
  APPEND_ALBUMS,
  APPEND_ARTISTS,
} from '../actions'

const credentials = (state = { isAuthorised: false }, action) => {
  switch (action.type) {
    case SAVE_CREDENTIALS:
      return {
        accessToken: action.accessToken,
        expiresIn: action.expiresIn,
        isAuthorised: true,
      }
    case SAVE_CREDENTIALS_ERROR:
      return {
        isAuthorised: false,
      }

    default:
      return state
  }
}

const profile = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER_PROFILE:
      return {
        id: action.id,
        name: action.name,
        imageUrl: action.imageUrl,
      }
    default:
      return state
  }
}

const appendEntities = (entityName, state, action) => {
  let entities = {}
  action[entityName].forEach(entity => {
    if (!state[entityName].hasOwnProperty(entity.id)) {
      entities[entity.id] = entity
    }
  })
  return {
    ...state,
    [entityName]: Object.assign(state[entityName], entities)
  }
}

const spotifyData = (
  state = {
    tracks: {},
    albums: {},
    artists: {},
    recentTracks: [],
    topTracks: [],
    topArtists: [],
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_RECENT_TRACKS:
      return {
        ...state,
        recentTracks: action.recentTracks,
      }
    case RECEIVE_TOP_TRACKS:
      return {
        ...state,
        topTracks: action.topTracks,
      }
    case RECEIVE_TOP_ARTISTS:
      return {
        ...state,
        topArtists: action.topArtists,
      }
    case APPEND_TRACKS:
      return appendEntities('tracks', state, action)
    case APPEND_ALBUMS:
      return appendEntities('albums', state, action)
    case APPEND_ARTISTS:
      return appendEntities('artists', state, action)
    default:
      return state
  }
}

export default combineReducers({
  credentials,
  profile,
  spotifyData,
})