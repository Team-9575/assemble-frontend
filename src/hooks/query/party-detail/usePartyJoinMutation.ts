import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import apiClient from 'src/api'
import { handleRetry } from '..'

export interface IJoinResponse {}

const joinParty = async ({ partyId }: { partyId?: number }) => {
  try {
    const { data } = await apiClient.post<IJoinResponse>(
      `/parties/${partyId}/join`
    )
    return data
  } catch (error) {
    return Promise.reject(error as AxiosError)
  }
}

export const usePartyJoinMutation = () => {
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['partyJoin'],
    mutationFn: joinParty,
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
