import React from 'react'
import { connect } from 'react-redux'
import Auth from '../components/Auth'
import Dashboard from '../components/Dashboard'
import styled from 'styled-components'

const HeaderSection = styled.section`
  height: 15vh;
  width: 100%;
  text-align: center;
  padding: 30px 0 0 0;
`

const Header = styled.h1`
  margin: 0;
  color: #16e176;
  font-size: 40px;
`

const Home = (props) => (
  <main>
    <HeaderSection>
      <Header>Spotify Dashboard</Header>
    </HeaderSection>
    {props.isAuthorised ? <Dashboard/> : <Auth/>}
  </main>
)

const mapStateToProps = (state) => ({
  isAuthorised: state.credentials.isAuthorised,
})

export default connect(
  mapStateToProps,
)(Home)