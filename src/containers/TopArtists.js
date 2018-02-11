import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
  fetchTopArtists,
} from '../actions'
import ArtistList from "../components/ArtistList";

class TopArtists extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    if (dispatch) {
      dispatch(fetchTopArtists())
    }
  }

  render() {
    const { artists } = this.props
    if (artists) {
      return <ArtistList artists={this.props.artists}/>
    } else {
      return <p>Loading...</p>
    }
  }
}

const mapStateToProps = (state) => {
  const { artists } = state.spotifyData
  if (!state.spotifyData.topArtists.data) return {}
  const artistsData = state.spotifyData.topArtists.data.map(topArtist => {
    const artist = artists[topArtist.id]
    if (!artist) return false
    return artist
  })
  return { artists: artistsData.filter(artist => artist !== false) }
}

export default connect(
  mapStateToProps,
)(TopArtists)