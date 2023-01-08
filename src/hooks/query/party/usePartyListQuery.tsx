import { useQuery, useQueryClient } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { MealType } from '@components/party/modal/Options'
import { handleRetry } from '..'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'

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
    return Promise.reject(error as AxiosError)
  }
}

export const usePartyListQuery = () => {
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['partyList'],
    staleTime: 10,
    cacheTime: 20,
    retry: (failureCount, error) =>
      handleRetry({
        failureCount,
        error,
        inProgress,
        accounts,
        isMsAuthenticated,
      }),
    queryFn: fetchPartyList,
  })
}
