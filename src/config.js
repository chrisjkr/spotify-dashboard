export default {
  spotify: {
    urls: {
      auth: 'https://accounts.spotify.com/authorize/',
      getRecentTracks: 'https://api.spotify.com/v1/me/player/recently-played',
      getTracks: 'https://api.spotify.com/v1/tracks',
    },
    clientId: '636a5cadeece4b70b21873d6422610dc',
    responseType: 'token',
    redirectUri: 'http://localhost:3000/auth-callback',
    scope: [
      'user-read-recently-played',
    ]
  }
}
