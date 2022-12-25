const route = {
  main: '/',
  partyDetail: (id: number) => `/party/${id}`,
  myParties: '/parties',
  myBankAccount: '/bank-account',
  myReview: '/review',
  myProfile: '/profile',
} as const

export default route
