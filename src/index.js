import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import reducer from './reducers'

const middleware = [ thunk, createLogger() ]

const store = createStore(reducer, applyMiddleware(...middleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
