import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AuthoriseHome from '../containers/Home'
import AuthCallback from '../containers/AuthCallback'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={AuthoriseHome}/>
      <Route exact path='/auth-callback' component={AuthCallback}/>
    </Switch>
  </BrowserRouter>
)

export default App
