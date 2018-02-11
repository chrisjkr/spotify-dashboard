import React from 'react'
import RecentTracks from "../containers/RecentTracks";
import styled from 'styled-components'

const DashboardContainer = styled.section`
  display: grid;
  overflow: hidden;
  height: 85vh;
  width: 100%;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-column-gap: 20px;
  padding: 0 20px;
`

const Dashboard = () => (
  <DashboardContainer>
    <section>
      <h2>Recent plays:</h2>
      <RecentTracks/>
    </section>
    <section>Something else</section>
    <section>Something else</section>
  </DashboardContainer>
)

export default Dashboard