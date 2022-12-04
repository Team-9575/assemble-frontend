import BaseLayout from '@components/common/base-layout'
import VStack from '@components/common/stack/VStack'
import MenuCard from '@components/menu/MenuCard'
import styled from '@emotion/styled'
import Image from 'next/image'

const PartyDetailPage = () => {
  return (
    <BaseLayout title="파티 이름 여기에 파티 이름 여기에">
      <>
        <MemberContainer>
          <ProfileWrapper>
            <Image src="/images/coffee.jpg" alt="party" layout="fill" />
          </ProfileWrapper>
          <ProfileWrapper>
            <Image src="/images/coffee.jpg" alt="party" layout="fill" />
          </ProfileWrapper>
          <ProfileWrapper>
            <Image src="/images/coffee.jpg" alt="party" layout="fill" />
          </ProfileWrapper>
          <ProfileWrapper>
            <Image src="/images/coffee.jpg" alt="party" layout="fill" />
          </ProfileWrapper>
          <AddButton>+</AddButton>
        </MemberContainer>
        <VStack gap="1rem" padding="1rem">
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </VStack>
      </>
    </BaseLayout>
  )
}
const MemberContainer = styled.div`
  display: flex;
  width: 100%;
  height: 2.25rem;
  background-color: #ffffff;
  border-radius: 0 0 20px 0;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  padding: 0 1rem;
  gap: 0.25rem;
`
const ProfileWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: yellow;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`
const AddButton = styled.button`
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  border: 1px solid #dbdbdb;
  color: #dbdbdb;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
export default PartyDetailPage
