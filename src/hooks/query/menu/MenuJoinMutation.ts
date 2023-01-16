import { useMutation, useQueryClient } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { handleRetry, logout } from '..'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'

export type MenuJoinResponseType = {}

const joinMenu = async ({
  partyId,
  menuId,
}: {
  partyId: number
  menuId: number
}) => {
  try {
    const { data } = await apiClient.post<MenuJoinResponseType>(
      `/parties/${partyId}/menus/${menuId}/join`
    )
    return data
  } catch (error) {
    logout()
    return Promise.reject(error as AxiosError)
  }
}

export const useMenuJoinMutation = () => {
  const queryClient = useQueryClient()
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  return useMutation('joinMenu', joinMenu, {
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
