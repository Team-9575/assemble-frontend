import { useQuery } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { MealType } from '@components/party/modal/Options'

export interface IParty {
  id: number
  name: string
  maxUserCount: number // 0 은 무제한
  mealType: MealType // 아침:0, 점심:1, 저녁:2
  gatherClosedAt: string
  tags: { id: number; name: string }[]
  currentUserCount: number
  host: number
  isJoined: boolean
}

const fetchPartyList = async () => {
  try {
    const { data } = await apiClient.get<IParty[]>('/parties')
    return data
  } catch (error) {
    return Promise.reject((error as AxiosError).message)
  }
}

export const usePartyListQuery = () => {
  return useQuery({
    queryKey: ['partyList'],
    queryFn: fetchPartyList,
  })
}
