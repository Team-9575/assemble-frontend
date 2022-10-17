import HStack from '@components/common/HStack'
import VStack from '@components/common/VStack'
import styled from '@emotion/styled'
import PartyCard from './Card'

const PartyList = () => {
  return (
    <Container>
      <MyPartyContainer>
        <Title>00님! 같이 먹고, 쉽게 나눠요!</Title>
        <Description>
          방을 직접 만드시거나, 마음에 드는 방에 참여해보세요!
        </Description>
      </MyPartyContainer>
      <PartyListContainer>
        <HStack gap="1rem">
          <div>
            <SelectedTab id="lunch" href="#lunch">
              점심 구해요
            </SelectedTab>
            <Underline isLunch />
          </div>
          <DefaultTab href="#dinner">저녁 구해요</DefaultTab>
        </HStack>
        <VStack margin="1rem 0 2rem 0" gap="0.75rem">
          <PartyCard isLunch title="햄버거 같이 드실 분!" />
          <PartyCard isLunch title="피자 같이 드실 분!" />
          <PartyCard isLunch title="서브웨이 같이 드실 분?" />
        </VStack>
        <HStack gap="1rem">
          <DefaultTab href="#lunch">점심 구해요</DefaultTab>
          <div>
            <SelectedTab id="dinner" href="#dinner">
              저녁 구해요
            </SelectedTab>
            <Underline />
          </div>
        </HStack>
        <VStack margin="1rem 0 2rem 0" gap="0.75rem">
          <PartyCard title="저녁메뉴 추천 받습니다" />
          <PartyCard title="옥상팟 구합니다." />
        </VStack>
      </PartyListContainer>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`
const MyPartyContainer = styled.section`
  padding: 0.75rem 1rem;
  border-radius: 0px 0px 30px 0px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1); // TODO: theme
`
const Title = styled.div`
  font-weight: bold;
  font-size: 20px; // TODO: theme
  letter-spacing: -0.2px;
`
const Description = styled.div`
  color: #757575; // TODO: theme
  font-size: 14px; // TODO: theme
  letter-spacing: -0.2px;
  margin: 0.25rem 0 0.75rem 0;
`
const PartyListContainer = styled.section`
  padding: 1.5rem 1rem;
`
const SelectedTab = styled.a`
  font-weight: bold;
  font-size: 18px; // TODO: theme
  letter-spacing: -0.6px;
`
const DefaultTab = styled.a`
  font-weight: bold;
  font-size: 18px; // TODO: theme
  letter-spacing: -0.6px;
  color: #a8a8a8; // TODO: theme
`
const Underline = styled.hr<{ isLunch?: boolean }>`
  background-color: ${({ isLunch }) =>
    isLunch ? '#ff6868' : '#3909C2'}; // TODO: theme
  height: 0.25rem;
  border: none;
`
export default PartyList
