import { useQuery } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { handleRetry } from '..'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import Router from 'next/router'
import { PayType } from './useNewMenuMutation'

export interface IMenu {
  id: number
  isJoined: boolean
  name: string
  party: number
  payType: PayType
  price: number
  users: { id: number; fullName: string; profile_pic: string }[]
}

export interface IPartyDetail {
  description: string
  gatherClosedAt: string
  host: number
  id: number
  maxUserCount: number
  mealType: number
  name: '같이 점심 드실 분?'
  partyMenus: IMenu[]
  tags: { id: number; name: string }[]
}

const fetchPartyDetail = async (id: number) => {
  try {
    const { data } = await apiClient.get<IPartyDetail>(`/parties/${id}`)
    return data
  } catch (error) {
    return Promise.reject(error as AxiosError)
  }
}

export const usePartyDetailQuery = () => {
  const { inProgress, accounts } = useMsal()
  const isMsAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['partyDetail'],
    queryFn: () => fetchPartyDetail(Number(Router.query.partyId)),
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