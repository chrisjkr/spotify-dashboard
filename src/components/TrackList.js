import React from 'react'
import Track from "./Track"
import CardList from './CardList'

const TrackList = ({ tracks }) => {
  const buildTrackList = () => tracks.map((track, index) => {
    return <Track key={index}
                  title={track.title}
                  artists={track.artists}
                  imageUrl={track.album.imageUrl}
                  trackUrl={track.url}
                  album={track.album}
                  playedAt={track.playedAt}
    />
  })

  return (
    <CardList>
      {buildTrackList()}
    </CardList>
  )
}

export default TrackList