import { useQuery } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'

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
    return Promise.reject((error as AxiosError).message)
  }
}

export const useUserInfo = () => {
  const csrf = Cookies.get('csrftoken')
  return useQuery({
    queryKey: ['user', csrf],
    enabled: !!csrf,
    queryFn: fetchUserInfo,
  })
}
