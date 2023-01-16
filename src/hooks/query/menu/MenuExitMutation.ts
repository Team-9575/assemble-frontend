import { useMutation, useQueryClient } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { handleRetry, logout } from '..'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'

export type MenuExitResponseType = {}

const exitMenu = async ({
  partyId,
  menuId,
}: {
  partyId: number
  menuId: number
}) => {
  try {
    const { data } = await apiClient.post<MenuExitResponseType>(
      `/parties/${partyId}/menus/${menuId}/exit`
    )
    return data
  } catch (error) {
    logout()
    return Promise.reject(error as AxiosError)
  }
}

export const useMenuExitMutation = () => {
  const queryClient = useQueryClient()
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  return useMutation('exitMenu', exitMenu, {
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
