import { useMutation } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { handleRetry } from '..'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'

export interface IUserInfoResponse {
  message: string
}

export interface IUserInfoRequest {
  bankName: string
  bankHolder: string
  bankAccount: string
}
const putUserInfo = async (userInfo: IUserInfoRequest) => {
  try {
    const { data } = await apiClient.put<IUserInfoResponse>(
      '/users/me',
      userInfo
    )
    return data
  } catch (error) {
    return Promise.reject((error as AxiosError).message)
  }
}

export const useUserMutation = () => {
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  return useMutation('bankAccount', putUserInfo, {
    retry: (failureCount, error) =>
      handleRetry({
        failureCount,
        error,
        inProgress,
        accounts,
        isMsAuthenticated,
      }),
  })
}
