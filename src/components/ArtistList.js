import React from 'react'
import CardList from './CardList'
import Artist from './Artist'

const ArtistList = ({ artists }) => {
  const artistElements = artists.map(artist => (
    <Artist {...artist}/>
  ))

  return (
    <CardList>
      {artistElements}
    </CardList>
  )
}

export default ArtistList