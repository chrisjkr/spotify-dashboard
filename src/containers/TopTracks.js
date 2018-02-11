import FetchedTrackList from './FetchedTrackList'
import {
  fetchTopTracks,
} from '../actions/spotifyData'

export default FetchedTrackList(fetchTopTracks, 'topTracks')
