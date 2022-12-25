import { useMutation } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'

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
  return useMutation('bankAccount', putUserInfo, {})
}
