import BaseLayout from '@components/common/base-layout'
import Button from '@components/common/button'
import VStack from '@components/common/stack/VStack'
import Members from '@components/party-detail/Members'
import MenuCard from '@components/party-detail/MenuCard'
import styled from '@emotion/styled'
import { theme } from '@styles/theme'

const PartyDetailPage = () => {
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
          <Button text="방 만들기" onClick={() => {}} />
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
export default PartyDetailPage
