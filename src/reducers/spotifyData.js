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
    case 'RECEIVE_RECENT_TRACKS':
      return {
        ...state,
        recentTracks: {
          data: action.recentTracks,
          receivedAt: new Date(),
        },
      }
    case 'RECEIVE_TOP_TRACKS':
      return {
        ...state,
        topTracks: {
          data: action.topTracks,
          receivedAt: new Date(),
        },
      }
    case 'RECEIVE_TOP_ARTISTS':
      return {
        ...state,
        topArtists: {
          data: action.topArtists,
          receivedAt: new Date(),
        },
      }
    case 'REMOVE_USER_DATA':
      return {
        ...state,
        recentTracks: {},
        topTracks: {},
        topArtists: {},
      }

    case 'APPEND_TRACKS':
      return appendEntities('tracks', state, action)
    case 'APPEND_ALBUMS':
      return appendEntities('albums', state, action)
    case 'APPEND_ARTISTS':
      return appendEntities('artists', state, action)
    default:
      return state
  }
}

export default spotifyData