import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrackList from '../components/TrackList'

/**
 * Creates track list container with Redux bindings.
 *
 * @param {Function} fetchAction
 * @param {String} trackList - "topTracks" | "recentTracks"
 * @param {Boolean} withPlayedAtData
 * @constructor
 */
const FetchedTrackList = (fetchAction, trackList, withPlayedAtData = false) => {
  class Tracks extends Component {
    componentDidMount() {
      const { dispatch } = this.props
      if (dispatch) {
        dispatch(fetchAction())
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
      const tracksData = state.spotifyData[trackList].map(listTrack => {
        const track = tracks[listTrack.id]
        if (!track) return false
        const album = albums[track.albumId]
        if (!album) return false
        const artistList = album.artistIds.map(artistId => artists[artistId])
        if (artistList.indexOf(undefined) > -1) return false

        return {
          title: track.title,
          url: track.url,
          album,
          artists: artistList,
          playedAt: withPlayedAtData ? listTrack.playedAt : '',
        }
      })
      return { tracks: tracksData.filter(track => track !== false) }
    }

    return {}
  }

  return connect(
    mapStateToProps,
  )(Tracks)
}

export default FetchedTrackList