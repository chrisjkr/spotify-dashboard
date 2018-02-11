import { combineReducers } from 'redux'
import credentials from './credentials'
import profile from './profile'
import spotifyData from './spotifyData'

export default combineReducers({
  credentials,
  profile,
  spotifyData,
})