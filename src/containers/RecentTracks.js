import FetchedTrackList from './FetchedTrackList'
import {
  fetchRecentTracks,
} from '../actions/spotifyData'

export default FetchedTrackList(fetchRecentTracks, 'recentTracks', true)
