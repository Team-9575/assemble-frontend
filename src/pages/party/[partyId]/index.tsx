import BaseLayout from '@components/common/base-layout'
import Button from '@components/common/button'
import VStack from '@components/common/stack/VStack'
import Members from '@components/party-detail/Members'
import MenuCard from '@components/party-detail/MenuCard'
import MenuDrawer from '@components/party-detail/MenuDrawer'
import PartyDetailDrawer from '@components/party-detail/PartyDetailDrawer'
import styled from '@emotion/styled'
import { usePartyDetailQuery } from '@hooks/query/party-detail/usePartyDetailQuery'
import { IconButton } from '@mui/material'
import { theme } from '@styles/theme'
import { GetServerSideProps } from 'next'
import { useState } from 'react'

const PartyDetailPage = () => {
  const { data: party, isLoading } = usePartyDetailQuery()
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false)
  const [isPartyDrawerOpen, setIsPartyDrawerOpen] = useState(false)
  return (
    <BaseLayout title={party?.name} hasHambergerButton={false}>
      <>
        <IconButton
          sx={{ position: 'absolute', right: '1rem', top: '0.5rem' }}
          onClick={() => {
            setIsPartyDrawerOpen(true)
          }}
        >
          <DetailModalIcon className="material-icons-outlined md-16">
            feed
          </DetailModalIcon>
        </IconButton>
        <Members />
        <VStack padding="1rem 1rem 9rem" gap="0.75rem">
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </VStack>
        <ButtonContainer>
          {/* <Button text="파티 참가하기" onClick={() => {}} /> */}
          <Button
            text="메뉴 추가하기"
            variant="outlined"
            onClick={() => {
              setIsMenuDrawerOpen(true)
            }}
          />
        </ButtonContainer>
        {isPartyDrawerOpen && (
          <PartyDetailDrawer onClose={() => setIsPartyDrawerOpen(false)} />
        )}
        {isMenuDrawerOpen && party?.id && (
          <MenuDrawer
            onClose={() => setIsMenuDrawerOpen(false)}
            partyId={party.id}
          />
        )}
      </>
    </BaseLayout>
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
const DetailModalIcon = styled.span`
  color: #757575;
`

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  return { props: { query } }
}

export default PartyDetailPage
