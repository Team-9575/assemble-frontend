import { useQuery } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { handleRetry } from '..'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import Router from 'next/router'

interface IMyReceiptResponse {}

const fetchMyReceipt = async (partyId: number) => {
  try {
    const { data } = await apiClient.get<IMyReceiptResponse>(
      `/parties/${partyId}/users/me/receipt`
    )
    return data
  } catch (error) {
    return Promise.reject(error as AxiosError)
  }
}

export const useMyReceiptQuery = () => {
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['individualReceipt'],
    queryFn: () => fetchMyReceipt(Number(Router.query.partyId)),
    retry: false, // TODO: check
  })
}
