import { useQuery } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { handleRetry } from '..'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import Router from 'next/router'
import { PayType } from './useNewMenuMutation'

export interface UserMenu {
  fullName: string
  id: number
  joinedMenus: {
    id: number
    name: string
    price: number
    party: number
    payType: PayType
  }[]
  totalPrice: number
}

interface IFullReceiptResponse {
  id: number
  receipts: UserMenu[]
  totalPrice: number
}

const fetchFullReceipt = async (partyId: number) => {
  try {
    const { data } = await apiClient.get<IFullReceiptResponse>(
      `/parties/${partyId}/users/receipt`
    )
    return data
  } catch (error) {
    return Promise.reject(error as AxiosError)
  }
}

export const useFullReceiptQuery = () => {
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['fullReceipt'],
    queryFn: () => fetchFullReceipt(Number(Router.query.partyId)),
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
