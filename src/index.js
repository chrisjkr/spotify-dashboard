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
import {
  loadState,
  saveState,
} from './localStorage'

const middleware = [ thunk, createLogger() ]

const store = createStore(reducer, loadState(), applyMiddleware(...middleware))

store.subscribe(() => { saveState(store.getState()) })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
