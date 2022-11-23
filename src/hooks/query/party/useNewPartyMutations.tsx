import { useMutation } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import endpoints from 'src/constants/endpoints'
import { MealType } from '@components/party/modal/Options'

export interface INewPartyResponse {
  //TODO: define type
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
      endpoints.parties,
      newPartyInfo
    )
    return data
  } catch (error) {
    return Promise.reject((error as AxiosError).message)
  }
}

export const useNuwPartyMutation = () => {
  return useMutation('new-party', postNewParty, {})
}
