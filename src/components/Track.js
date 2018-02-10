import React from 'react'
import styled from 'styled-components'
import Image from 'react-image'

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

const Track = ({
  title,
  artists,
  imageUrl,
  trackUrl,
  album,
}) => {
  const artistElements = artists.map(artist => (
    <Artist href={artist.url}>{artist.name}</Artist>
  ))

  return (
    <TrackItem>
      <div>
        <AlbumCover src={imageUrl}/>
      </div>
      <div>
        <TitleLink href={trackUrl}>{title}</TitleLink>
        <p><Artist>{artistElements}</Artist></p>
        <p><Album href={album.url}>{album.name}</Album></p>
      </div>
    </TrackItem>
  )
}



export default Track