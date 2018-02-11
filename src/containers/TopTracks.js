import FetchedTrackList from './FetchedTrackList'
import {
  fetchTopTracks,
} from '../actions'

export default FetchedTrackList(fetchTopTracks, 'topTracks')
