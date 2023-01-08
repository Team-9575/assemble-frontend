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

export enum PartyStatus {
  Active, // 활성화
  GatherClosed, // 모집마감(참가만 불가함, 메뉴 선택 가능)
  PartyClosed, // 파티종료(메뉴선택 불가능)
  SettlementInProgress, // 정산중 (파티장이 영수증 확정했을 때)
  SettlementCompleted, // 모두 정산 완료(모두 끝)
}
export interface IPartyDetail {
  description: string
  gatherClosedAt: string
  host: number
  id: number
  isJoined: boolean
  status: PartyStatus
  maxUserCount: number
  mealType: number
  name: string
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
