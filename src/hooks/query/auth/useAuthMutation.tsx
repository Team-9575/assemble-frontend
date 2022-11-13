import { useMutation } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import endpoints from 'src/constants/endpoints'

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
      endpoints.token,
      accountInfo
    )
    return data
  } catch (error) {
    return Promise.reject((error as AxiosError).message)
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
