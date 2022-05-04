JWT token-based authentication

When a user signs in, the server responds with a JWT token set to expire in 24 hours. The token is saved to local storage. If the user comes back and reloads the application before their token expires, the server verfies its status and responds with a new token, effectively resetting the 24 hour expiry period.