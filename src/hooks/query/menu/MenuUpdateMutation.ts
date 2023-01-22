import { useMutation, useQueryClient } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { handleRetry, logout } from '..'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { PayType } from '../party-detail/useNewMenuMutation'

interface Response {}
interface Request {
  name: string
  description: string
  price: number
  payType: PayType | null
  quantity: number
}

const updateMenu = async ({
  partyId,
  menuId,
}: {
  partyId: number
  menuId: number
  menu: Request
}) => {
  try {
    const { data } = await apiClient.put<Response>(
      `/parties/${partyId}/menus/${menuId}`
    )
    return data
  } catch (error) {
    logout()
    return Promise.reject(error as AxiosError)
  }
}

export const useMenuUpdateMutation = () => {
  const queryClient = useQueryClient()
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  return useMutation('updateMenu', updateMenu, {
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
