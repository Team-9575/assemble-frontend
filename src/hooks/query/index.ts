import { InteractionStatus } from '@azure/msal-browser'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import apiClient, { HttpStatusCode } from 'src/api'
import { AuthResponseType } from './auth/useAuthMutation'

export const logout = async () => {
  Cookies.remove('csrftoken')
  await apiClient.post('/logout')
}

export const refreshToken = async ({
  error,
  isMsAuthenticated,
  inProgress,
  accounts,
}: {
  error: any
  isMsAuthenticated: boolean
  inProgress: InteractionStatus
  accounts: any[]
}) => {
  if (!isMsAuthenticated && inProgress === InteractionStatus.None) {
    return
  }
  let token = null
  if (accounts.length) {
    const { homeAccountId, environment, idTokenClaims } = accounts[0]
    const sessionKey = `${homeAccountId}-${environment}-refreshtoken-${idTokenClaims?.aud}----`
    const sessionValue = sessionStorage.getItem(sessionKey)
    token = sessionValue && JSON.parse(sessionValue).secret
  }
  if (!token) {
    // logout()
    return
  }
  try {
    const { data } = await apiClient.post<AuthResponseType>('/token/ms', {
      token,
    })
    return data
  } catch (error) {
    logout()
    return Promise.reject(error as AxiosError)
  }
}

export const handleRetry = ({
  failureCount,
  error,
  isMsAuthenticated,
  inProgress,
  accounts,
}: {
  failureCount: number
  error: any
  isMsAuthenticated: boolean
  inProgress: InteractionStatus
  accounts: any[]
}) => {
  if (
    failureCount < 3 &&
    error?.response?.status === HttpStatusCode.Unauthorized
  ) {
    refreshToken({ error, isMsAuthenticated, inProgress, accounts })
    return true
  }
  return false
}
