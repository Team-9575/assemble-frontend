import { useMutation, useQueryClient } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { MealType } from '@components/party/modal/Options'

export interface INewPartyResponse {
  description: string
  gatherClosedAt: string
  host: number
  id: number
  maxUserCount: 0
  mealType: 1
  name: string
  tags: { name: string; id: number }[]
}

export interface INewPartyRequest {
  name: string
  maxUserCount: number // 0 은 무제한
  mealType: MealType // 아침:0, 점심:1, 저녁:2
  gatherClosedAt: string
  restaurantLink: string
  tags: string[]
  isPrivate: boolean
}

const postNewParty = async (newPartyInfo: INewPartyRequest) => {
  try {
    const { data } = await apiClient.post<INewPartyResponse>(
      '/parties',
      newPartyInfo
    )
    return data
  } catch (error) {
    return Promise.reject(error as AxiosError)
  }
}

export const useNewPartyMutation = () => {
  return useMutation('new-party', postNewParty, {})
}
