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

/**
 * Checks if data was fetched in the last 5 minutes.
 *
 * @param {object} subState - Needs to have structure of {data: array, receivedAt: Date}
 * @returns {boolean} - Whether data was fetched more than 5 minutes ago.
 */
export const shouldFetch = (subState) => {
  const receivedAt = subState.receivedAt
  return !receivedAt || getTime(new Date()) - getTime(receivedAt) > 1000 * 60 * 5;
}

/**
 * Clears user data. Used for logging out.
 */
export const clearUserData = () => async (dispatch) => {
  dispatch(removeCredentials())
  dispatch(removeUserProfile())
  dispatch(removeUserData())
}
