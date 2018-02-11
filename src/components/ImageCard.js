import React from 'react'
import styled from 'styled-components'
import Image from 'react-image'

const Card = styled.div`
  width: 90%;
  height: 150px;
  margin: 10px;
  background-color: #292F36;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-column-gap: 20px;
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`

const ImageCard = ({ imageUrl, children }) => (
  <Card>
    <div>
      <StyledImage src={imageUrl}/>
    </div>
    <div>
      {children}
    </div>
  </Card>
)

export default ImageCard