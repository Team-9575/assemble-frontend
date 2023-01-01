import { useQuery } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useIsAuthenticated } from '@azure/msal-react'

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
  const isMSAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['user'],
    enabled: !!csrf && isMSAuthenticated,
    queryFn: fetchUserInfo,
  })
}
