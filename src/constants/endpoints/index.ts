const authEndpoints = {
  token: '/token/ms',
} as const

const partyEndpoints = {
  parties: '/parties',
}

const endpoints = {
  ...authEndpoints,
  ...partyEndpoints,
} as const

export default endpoints
