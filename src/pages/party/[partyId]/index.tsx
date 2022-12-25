import BaseLayout from '@components/common/base-layout'
import Button from '@components/common/button'
import VStack from '@components/common/stack/VStack'
import Members from '@components/party-detail/Members'
import MenuCard from '@components/party-detail/MenuCard'
import styled from '@emotion/styled'
import { usePartyDetailQuery } from '@hooks/query/party/usePartyDetailQuery'
import { theme } from '@styles/theme'
import { GetServerSideProps } from 'next'

const PartyDetailPage = () => {
  const { data, isLoading } = usePartyDetailQuery()
  return (
    <BaseLayout title="파티이름 여기에">
      <>
        <Members />
        <VStack padding="1rem 1rem 9rem" gap="0.75rem">
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </VStack>
        <ButtonContainer>
          <Button text="파티 참가하기" onClick={() => {}} />
        </ButtonContainer>
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  return { props: { query } }
}

export default PartyDetailPage
