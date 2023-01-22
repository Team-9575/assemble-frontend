import { useMutation, useQueryClient } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { handleRetry, logout } from '..'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'

interface Response {}

const deleteMenu = async ({
  partyId,
  menuId,
}: {
  partyId: number
  menuId: number
}) => {
  try {
    const { data } = await apiClient.delete<Response>(
      `/parties/${partyId}/menus/${menuId}`
    )
    return data
  } catch (error) {
    logout()
    return Promise.reject(error as AxiosError)
  }
}

export const useMenuDeleteMutation = () => {
  const queryClient = useQueryClient()
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  return useMutation('deleteMenu', deleteMenu, {
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
