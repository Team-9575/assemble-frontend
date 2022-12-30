import { useQuery } from 'react-query'
import apiClient from 'src/api'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'

export interface IPartyDetail {
  description: string
  gatherClosedAt: string
  host: number
  id: number
  maxUserCount: number
  mealType: number
  name: '같이 점심 드실 분?'
  partyMenus: any[]
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
  const router = useRouter()
  return useQuery({
    queryKey: ['partyDetail'],
    queryFn: () => fetchPartyDetail(Number(router.query.partyId)),
  })
}
