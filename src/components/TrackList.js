import React from 'react'
import Track from "./Track"
import styled from 'styled-components'

const TrackListContainer = styled.section`
  width: 100%;
  height: 85vh;
  overflow: auto;
`

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
    <TrackListContainer>
      {buildTrackList()}
    </TrackListContainer>
  )
}

export default TrackList