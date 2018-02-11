import React from 'react'
import styled from 'styled-components'
import Image from 'react-image'
import distanceInWords from 'date-fns/distance_in_words_to_now'

const TrackItem = styled.div`
  width: 90%;
  margin: 10px;
  background-color: #292F36;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-column-gap: 20px;
`

const AlbumCover = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`

const TitleLink = styled.a`
  text-decoration: none;
  color: white;
  font-size: 24px;
  font-weight: 700;
  transition: 0.2s;
  
  &:hover {
    color: #b0b0b0;
  }
`

const Artist = styled.a`
  text-decoration: none;
  color: #c6c6c6;
  font-size: 18px;
  
   &:hover {
    color: #b0b0b0;
  }
`

const Album = styled.a`
  text-decoration: none;
  color: #c6c6c6;
  font-size: 14px;
  
   &:hover {
    color: #b0b0b0;
  }
`

const PlayedAt = styled.span`
  
`

const Track = ({
  title,
  artists,
  imageUrl,
  trackUrl,
  album,
  playedAt = ''
}) => {
  const artistElements = artists.map((artist, index) => (
    <Artist key={index} href={artist.url}>{artist.name}</Artist>
  )).reduce((prev, curr) => [prev, ', ', curr])

  return (
    <TrackItem>
      <div>
        <AlbumCover src={imageUrl}/>
      </div>
      <div>
        <TitleLink href={trackUrl}>{title}</TitleLink>
        <p>{artistElements}</p>
        <p><Album href={album.url}>{album.name}</Album></p>
        {playedAt
          ? <p><PlayedAt>{distanceInWords(new Date(playedAt))} ago</PlayedAt></p>
          : ''
        }
      </div>
    </TrackItem>
  )
}



export default Track