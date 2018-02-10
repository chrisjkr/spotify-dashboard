import React from 'react'
import AuthButton from "./AuthButton"
import styled from 'styled-components'

const Section = styled.section`
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
`

const Container = styled.section`
  width: 400px;
  height: 600px;
  background-color: #292F36;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`

const Auth = () => (
  <Section>
    <Container>
      <AuthButton>Log in with Spotify</AuthButton>
    </Container>
  </Section>
)


export default Auth