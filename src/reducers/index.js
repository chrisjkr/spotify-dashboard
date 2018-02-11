import { combineReducers } from 'redux'
import {
  SAVE_CREDENTIALS,
  SAVE_CREDENTIALS_ERROR,
  REMOVE_CREDENTIALS,
  RECEIVE_USER_PROFILE,
  REMOVE_USER_PROFILE,
  RECEIVE_RECENT_TRACKS,
  RECEIVE_TOP_TRACKS,
  RECEIVE_TOP_ARTISTS,
  REMOVE_USER_DATA,
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
    case REMOVE_CREDENTIALS:
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
        receivedAt: new Date(),
        id: action.id,
        name: action.name,
        imageUrl: action.imageUrl,
      }
    case REMOVE_USER_PROFILE:
      return {}
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
    recentTracks: { data: [] },
    topTracks: { data: [] },
    topArtists: { data: [] },
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_RECENT_TRACKS:
      return {
        ...state,
        recentTracks: {
          data: action.recentTracks,
          receivedAt: new Date(),
        },
      }
    case RECEIVE_TOP_TRACKS:
      return {
        ...state,
        topTracks: {
          data: action.topTracks,
          receivedAt: new Date(),
        },
      }
    case RECEIVE_TOP_ARTISTS:
      return {
        ...state,
        topArtists: {
          data: action.topArtists,
          receivedAt: new Date(),
        },
      }
    case REMOVE_USER_DATA:
      return {
        ...state,
        recentTracks: {},
        topTracks: {},
        topArtists: {},
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