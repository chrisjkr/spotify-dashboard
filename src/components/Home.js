import React from 'react'
import Auth from "./Auth";
import Dashboard from "./Dashboard";

const Home = (props) => (
  <main>
    <h1>Spotify Dashboard</h1>
    {props.isAuthorised ? <Dashboard/> : <Auth/>}
  </main>
)

export default Home