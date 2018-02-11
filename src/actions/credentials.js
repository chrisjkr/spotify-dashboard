export const SAVE_CREDENTIALS = 'SAVE_CREDENTIALS'
export const SAVE_CREDENTIALS_ERROR = 'SAVE_CREDENTIALS_ERROR'
export const REMOVE_CREDENTIALS = 'REMOVE_CREDENTIALS'

/**
 * @param {string} accessToken
 * @param {int} expiresIn
 * @returns {{type: 'SAVE_CREDENTIALS', isAuthorised: boolean, accessToken: string, expiresIn: int}}
 */
export const saveCredentials = (accessToken, expiresIn) => ({
  type: SAVE_CREDENTIALS,
  isAuthorised: true,
  accessToken,
  expiresIn,
})

/**
 * @returns {{type: 'SAVE_CREDENTIALS_ERROR', isAuthorised: false}}
 */
export const saveCredentialsError = () => ({
  type: SAVE_CREDENTIALS_ERROR,
  isAuthorised: false,
})

/**
 * @returns {{type: 'REMOVE_CREDENTIALS'}}
 */
export const removeCredentials = () => ({
  type: REMOVE_CREDENTIALS,
})