import { useMutation, useQueryClient } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { MealType } from '@components/party/modal/Options'
import { handleRetry } from '..'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'

interface Response {}

const closeParty = async ({ partyId }: { partyId: number }) => {
  try {
    const { data } = await apiClient.post<Response>(`/parties/${partyId}/close`)
    return data
  } catch (error) {
    return Promise.reject(error as AxiosError)
  }
}

export const useClosePartyMutation = () => {
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  const queryClient = useQueryClient()
  return useMutation('closeParty', closeParty, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['partyDetail'],
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
