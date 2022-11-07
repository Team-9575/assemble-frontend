// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MS_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${
      process.env.NEXT_PUBLIC_MS_TANENT_ID || ''
    }`,
    redirectUri: '/',
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
}

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
}

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
}
