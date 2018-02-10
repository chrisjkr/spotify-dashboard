import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrackList from '../components/TrackList'
import {
  fetchRecentTracks,
} from '../actions'

class RecentTracks extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    if (dispatch) {
      dispatch(fetchRecentTracks())
    }
  }

  render() {
    const { tracks } = this.props
    if (tracks) {
      return <TrackList tracks={this.props.tracks}/>
    } else {
      return <p>Loading...</p>
    }
  }
}

const mapStateToProps = (state) => {
  const { tracks, albums, artists } = state.spotifyData

  if (Object.keys(tracks).length && Object.keys(albums).length && Object.keys(artists).length) {
    const tracksData = state.spotifyData.recentTracks.map(recentTrack => {
      const track = tracks[recentTrack.id]
      const album = albums[track.albumId]
      const artistList = album.artistIds.map(artistId => artists[artistId])

      return {
        title: track.title,
        url: track.url,
        album,
        artists: artistList,
      }
    })
    return { tracks: tracksData }
  }

  return {}
}

export default connect(
  mapStateToProps
)(RecentTracks)