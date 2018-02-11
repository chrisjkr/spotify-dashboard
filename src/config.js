export default {
  spotify: {
    clientId: '636a5cadeece4b70b21873d6422610dc',
    responseType: 'token',
    redirectUri: 'http://localhost:3000/auth-callback',
    scope: [
      'user-read-recently-played',
      'user-top-read',
    ]
  }
}
