
export const SAVE_CREDENTIALS = 'SAVE_CREDENTIALS'
export const SAVE_CREDENTIALS_ERROR = 'SAVE_CREDENTIALS_ERROR'
export const REMOVE_CREDENTIALS = 'REMOVE_CREDENTIALS'

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