import React from 'react'
import Button from './Button'
import qs from 'query-string'
import config from '../config.js'

const AuthButton = ({ children }) => {
  const authorise = async () => {
    const spotify = config.spotify
    const params = {
      client_id: spotify.clientId,
      response_type: spotify.responseType,
      redirect_uri: spotify.redirectUri,
    }

    const queryString = '?' + qs.stringify(params)
    window.location.href = config.spotify.urls.auth + queryString
  }

  return <Button onClick={authorise}>{children}</Button>
}

export default AuthButton