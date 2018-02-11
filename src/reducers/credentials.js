const credentials = (state = { isAuthorised: false }, action) => {
  switch (action.type) {
    case 'SAVE_CREDENTIALS':
      return {
        accessToken: action.accessToken,
        expiresIn: action.expiresIn,
        isAuthorised: true,
      }
    case 'SAVE_CREDENTIALS_ERROR':
      return {
        isAuthorised: false,
      }
    case 'REMOVE_CREDENTIALS':
      return {
        isAuthorised: false,
      }

    default:
      return state
  }
}

export default credentials