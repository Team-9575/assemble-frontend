import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import apiClient from 'src/api'
import { handleRetry } from '..'

export enum PayType {
  Individual,
  All,
  Group,
}

export interface IMenuResponse {
  description: string
  id: number
  name: string
  payType: PayType
  price: number
}

export interface IMenuRequest {
  name: string
  description: string
  price: number
  payType: PayType | null
}

const postNewMenu = async ({
  menu,
  partyId,
}: {
  menu: IMenuRequest
  partyId: number
}) => {
  try {
    const { data } = await apiClient.post<IMenuResponse>(
      `/parties/${partyId}/menus`,
      menu
    )
    return data
  } catch (error) {
    return Promise.reject(error as AxiosError)
  }
}

export const useNewMenuMutation = () => {
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['new-party'],
    mutationFn: postNewMenu,
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
