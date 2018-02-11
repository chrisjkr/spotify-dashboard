import FetchedTrackList from './FetchedTrackList'
import {
  fetchRecentTracks,
} from '../actions'

export default FetchedTrackList(fetchRecentTracks, 'recentTracks', true)
