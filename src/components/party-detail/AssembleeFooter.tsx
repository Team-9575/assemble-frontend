import Button from '@components/common/button'
import styled from '@emotion/styled'
import {
  IPartyDetail,
  PartyStatus,
} from '@hooks/query/party-detail/usePartyDetailQuery'
import { theme } from '@styles/theme'
import { useMemo, useState } from 'react'
import MyReceipt from './MyReceipt'
import NewMenuDrawer from './NewMenuDrawer'

interface AssemblerFooterProps {
  party?: IPartyDetail
}

const AssembleeFooter = ({ party }: AssemblerFooterProps) => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false)
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)

  const FooterButtons = useMemo(() => {
    switch (party?.status) {
      case PartyStatus.Active:
      case PartyStatus.GatherClosed:
        return (
          <Button
            text="메뉴 추가하기"
            variant="outlined"
            onClick={() => {
              setIsMenuDrawerOpen(true)
            }}
          />
        )
      case PartyStatus.PartyClosed:
      case PartyStatus.SettlementInProgress:
      case PartyStatus.SettlementCompleted:
        return (
          <Button
            text="영수증 보기"
            variant="outlined"
            onClick={() => {
              setIsReceiptOpen(true)
            }}
          />
        )
    }
    return null
  }, [party])
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
      {isReceiptOpen && (
        <MyReceipt
          isOpen={isReceiptOpen}
          onClose={() => {
            setIsReceiptOpen(false)
          }}
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

export default AssembleeFooter
