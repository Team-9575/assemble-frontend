import VStack from '@components/common/stack/VStack'
import PartyCard from '@components/party/Card'
import styled from '@emotion/styled'
import { IParty } from '@hooks/query/party/useClosedPartiesQuery'
import { ClosedPartyTab } from 'src/pages/closed-parties'
import FooterButton from './FooterButton'

interface IClosedPartyListProps {
  isLoading: boolean
  selectedTab: string
  parties?: {
    join: IParty[]
    create: IParty[]
  }
}

const ClosedPartyList = ({
  isLoading,
  selectedTab,
  parties,
}: IClosedPartyListProps) => {
  if (isLoading) {
    return (
      <VStack gap="1rem" padding="1rem">
        <PartyCard isLoading isLunch />
        <PartyCard isLoading />
      </VStack>
    )
  }
  if (selectedTab === ClosedPartyTab.Join) {
    return !!parties?.join?.length ? (
      <VStack gap="1rem" padding="1rem">
        {parties?.join.map((party) => (
          <PartyCard key={party.id} party={party} isClosed />
        ))}
      </VStack>
    ) : (
      <>
        <EmptyText>참여했던 파티가 없습니다.</EmptyText>
        <FooterButton />
      </>
    )
  }
  return !!parties?.create?.length ? (
    <VStack gap="1rem" padding="1rem">
      {parties?.create.map((party) => (
        <PartyCard key={party.id} party={party} isClosed />
      ))}
    </VStack>
  ) : (
    <>
      <EmptyText>만든 파티가 없습니다.</EmptyText>
      <FooterButton />
    </>
  )
}

const EmptyText = styled.p`
  color: #757575;
  padding-top: 10rem;
  text-align: center;
  width: 100%;
`
export default ClosedPartyList
