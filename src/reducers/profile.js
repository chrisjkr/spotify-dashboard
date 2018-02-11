const profile = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_USER_PROFILE':
      return {
        receivedAt: new Date(),
        id: action.id,
        name: action.name,
        imageUrl: action.imageUrl,
      }
    case 'REMOVE_USER_PROFILE':
      return {}
    default:
      return state
  }
}

export default profile