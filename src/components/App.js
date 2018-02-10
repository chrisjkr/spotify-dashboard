import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AuthoriseHome from '../containers/AuthoriseHome'
import AuthCallback from '../containers/AuthCallback'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={AuthoriseHome}/>
          <Route exact path='/auth-callback' component={AuthCallback}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
