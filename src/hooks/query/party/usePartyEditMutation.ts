import { useMutation, useQueryClient } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { MealType } from '@components/party/modal/Options'
import { handleRetry } from '..'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'

export interface IPartyEditResponse {
  description: string
  gatherClosedAt: string
  host: number
  id: number
  maxUserCount: 0
  mealType: 1
  name: string
  tags: { name: string; id: number }[]
}

export interface IPartyEditRequest {
  name: string
  maxUserCount: number // 0 은 무제한
  mealType: MealType // 아침:0, 점심:1, 저녁:2
  gatherClosedAt: string
  restaurantLink: string
  tags: string[]
  isPrivate: boolean
}

const updateParty = async ({
  partyInfo,
  partyId,
}: {
  partyInfo: IPartyEditRequest
  partyId: number
}) => {
  try {
    const { data } = await apiClient.put<IPartyEditResponse>(
      `/parties/${partyId}`,
      partyInfo
    )
    return data
  } catch (error) {
    return Promise.reject(error as AxiosError)
  }
}

export const usePartyEditMutation = () => {
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  const queryClient = useQueryClient()
  return useMutation('updateParty', updateParty, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['partyList'],
      })
    },
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
