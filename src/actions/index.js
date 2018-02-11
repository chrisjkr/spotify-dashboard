import getTime from 'date-fns/get_time'
import { removeCredentials } from './credentials'
import { removeUserProfile } from './profile'
import { removeUserData } from './spotifyData'

/**
 * Appends authorisation header and fetches JSON from url.
 *
 * @param {String} url
 * @param {String} token
 * @returns {Promise<Object>}
 */
export const fetchWithAuth = async (url, token) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return await response.json()
}

export const shouldFetch = (subState) => {
  const receivedAt = subState.receivedAt
  return !receivedAt || getTime(new Date()) - getTime(receivedAt) > 1000 * 60 * 5;
}

export const clearUserData = () => async (dispatch) => {
  dispatch(removeCredentials())
  dispatch(removeUserProfile())
  dispatch(removeUserData())
}
