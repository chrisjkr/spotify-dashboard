import React, { Component } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import {
  saveCredentials,
  saveCredentialsError
} from '../actions'

class AuthCallback extends Component {
  componentWillMount() {
    const { dispatch, history } = this.props
    const params = qs.parse(window.location.hash)

    if (params.access_token && params.expires_in) {
      dispatch(saveCredentials(params.access_token, Number(params.expires_in)))
    } else {
      dispatch(saveCredentialsError())
    }

    history.push('/')
  }

  render() {
    return <div>Redirecting to dashboard...</div>
  }
}

export default connect()(AuthCallback)