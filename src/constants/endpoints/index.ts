const authEndpoints = {
  token: '/token/ms',
} as const

const endpoints = {
  ...authEndpoints,
} as const

export default endpoints
