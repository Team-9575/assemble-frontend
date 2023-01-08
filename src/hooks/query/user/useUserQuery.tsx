import { useQuery } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { handleRetry } from '..'

export interface IUserResponse {
  bankAccount: string
  bankHolder: string
  bankName: string
  email: string
  fullName: string
  id: number
  profilePic: string
}

const fetchUserInfo = async () => {
  try {
    const { data } = await apiClient.get<IUserResponse>('users/me')
    return data
  } catch (error) {
    return Promise.reject(error as AxiosError)
  }
}

export const useUserQuery = () => {
  const csrf = Cookies.get('csrftoken')
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['user'],
    retry: (failureCount, error) =>
      handleRetry({
        failureCount,
        error,
        inProgress,
        accounts,
        isMsAuthenticated,
      }),
    enabled: !!csrf && isMsAuthenticated,
    queryFn: fetchUserInfo,
  })
}
