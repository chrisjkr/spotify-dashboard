import React from 'react'
import ImageCard from './ImageCard'
import styled from 'styled-components'

const ArtistLink = styled.a`
  text-decoration: none;
  color: white;
  font-size: 24px;
  font-weight: 700;
  transition: 0.2s;
  
  &:hover {
    color: #b0b0b0;
  }
`

const Artist = ({ imageUrl, name, url }) => (
  <ImageCard imageUrl={imageUrl}>
    <ArtistLink href={url}>{name}</ArtistLink>
  </ImageCard>
)

export default Artist