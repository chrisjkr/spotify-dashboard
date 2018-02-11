import React from 'react'
import RecentTracks from '../containers/RecentTracks'
import TopTracks from '../containers/TopTracks'
import TopArtists from '../containers/TopArtists'
import styled from 'styled-components'
import Profile from '../containers/Profile'

const DashboardContainer = styled.section`
  display: grid;
  overflow: hidden;
  height: 85vh;
  width: 95%;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-column-gap: 20px;
  padding: 0 20px;
`

const SectionHeader = styled.h2`
  color: #16e176;
`

const Dashboard = () => (
  <DashboardContainer>
    <Profile/>
    <section></section>
    <section></section>
    <section>
      <SectionHeader>Recent plays:</SectionHeader>
      <RecentTracks/>
    </section>
    <section>
      <SectionHeader>Top tracks:</SectionHeader>
      <TopTracks/>
    </section>
    <section>
      <SectionHeader>Top artists:</SectionHeader>
      <TopArtists/>
    </section>
  </DashboardContainer>
)

export default Dashboard