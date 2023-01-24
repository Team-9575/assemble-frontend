import Button from '@components/common/button'
import HStack from '@components/common/stack/HStack'
import VStack from '@components/common/stack/VStack'
import styled from '@emotion/styled'
import { useClosePartyMutation } from '@hooks/query/party-detail/useClosePartyMutation'
import {
  IPartyDetail,
  PartyStatus,
} from '@hooks/query/party-detail/usePartyDetailQuery'
import { theme } from '@styles/theme'
import { useMemo, useState } from 'react'
import NewMenuDrawer from './NewMenuDrawer'

interface AssemblerFooterProps {
  party?: IPartyDetail
}

const AssemblerFooter = ({ party }: AssemblerFooterProps) => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false)
  const { mutateAsync: closeParty } = useClosePartyMutation()

  const FooterButtons = useMemo(() => {
    switch (party?.status) {
      case PartyStatus.Active:
      case PartyStatus.GatherClosed:
        return (
          <VStack alignItems="stretch">
            <TotalPrice>총 26,500원(TODO)</TotalPrice>
            <HStack gap="0.5rem">
              <Button
                text="메뉴 추가하기"
                onClick={() => {
                  setIsMenuDrawerOpen(true)
                }}
              />
              <Button
                text="파티 마감하기"
                variant="outlined"
                onClick={async () => {
                  await closeParty({ partyId: party?.id || 0 })
                }}
              />
            </HStack>
          </VStack>
        )
      // case PartyStatus.PartyClosed:
    }
    return null
  }, [party, closeParty])
  return (
    <>
      <ButtonContainer>{FooterButtons}</ButtonContainer>
      {party?.id && (
        <NewMenuDrawer
          isOpen={isMenuDrawerOpen}
          onClose={() => setIsMenuDrawerOpen(false)}
          partyId={party.id}
        />
      )}
    </>
  )
}

const ButtonContainer = styled.div`
  position: fixed;
  padding: 0.75rem 1rem 1.25rem;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.2);
  max-width: ${theme.maxWidth};
`
const TotalPrice = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`

export default AssemblerFooter
