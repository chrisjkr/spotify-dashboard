import React from 'react'
import styled from 'styled-components'
import distanceInWords from 'date-fns/distance_in_words_to_now'
import ImageCard from './ImageCard'

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
  color: #16e176;
`

const Row = styled.p`
  margin: 2px 0;
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
    <ImageCard imageUrl={imageUrl}>
      <TitleLink href={trackUrl}>{title}</TitleLink>
      <Row>{artistElements}</Row>
      <Row><Album href={album.url}>{album.name}</Album></Row>
      {playedAt
        ? <Row style={{marginTop: '10px'}}><PlayedAt>{distanceInWords(new Date(playedAt))} ago</PlayedAt></Row>
        : ''
      }
    </ImageCard>
  )
}



export default Track