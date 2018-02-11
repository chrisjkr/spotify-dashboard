import { fetchWithAuth, shouldFetch } from './index'

export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE'
export const REMOVE_USER_PROFILE = 'REMOVE_USER_PROFILE'

export const receiveUserProfile = (profile) => ({
  type: RECEIVE_USER_PROFILE,
  id: profile.id,
  name: profile.display_name,
  imageUrl: profile.images[0].url,
})

export const removeUserProfile = () => ({
  type: REMOVE_USER_PROFILE,
})

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