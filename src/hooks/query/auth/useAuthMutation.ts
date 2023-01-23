import { useMutation } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { logout } from '..'

export type AuthResponseType = {
  accessToken: string
  refreshToken: string
}

export type AuthRequestType = {
  token: string
}

const tryLogin = async (accountInfo: AuthRequestType) => {
  try {
    const { data } = await apiClient.post<AuthResponseType>(
      '/token/ms',
      accountInfo
    )
    return data
  } catch (error) {
    logout()
    alert('auth error' + (error as AxiosError)?.response?.status)
    return Promise.reject(error as AxiosError)
  }
}

export const useAuthMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: AuthResponseType) => void
  onError?: () => void
}) => {
  return useMutation('login', tryLogin, {
    onSuccess,
    onError,
  })
}
