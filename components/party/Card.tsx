import HStack from '@components/common/HStack'
import VStack from '@components/common/VStack'
import styled from '@emotion/styled'
import Image from 'next/image'

interface PartyCardProps {
  isLunch?: boolean
  title: string
}

const PartyCard = ({ title, isLunch = false }: PartyCardProps) => {
  return (
    <Container isLunch={isLunch}>
      <HStack gap="0.5rem">
        <ImageWrapper size="2.5rem">
          <Image src="/images/coffee.jpg" alt="party" layout="fill" />
        </ImageWrapper>
        <VStack gap="0.5rem">
          <Title>{title}</Title>
          <HStack>
            <ImageWrapper size="1.125rem">
              <Image src="/images/profile.jpg" alt="profile" layout="fill" />
            </ImageWrapper>
            <ImageWrapper size="1.125rem">
              <Image src="/images/profile.jpg" alt="profile" layout="fill" />
            </ImageWrapper>
            <Member>5명 참여 중</Member>
          </HStack>
        </VStack>
      </HStack>
      <HStack margin="1.25rem 0 0 0" justifyContent="space-between">
        <HStack gap="0.25rem">
          <Keyword>#간단히먹어요</Keyword>
          <Keyword>#배달예정</Keyword>
        </HStack>
        <EndTime>AM 11:30까지</EndTime>
      </HStack>
    </Container>
  )
}

const Container = styled.div<{ isLunch: boolean }>`
  border-left: 4px solid ${({ isLunch }) => (isLunch ? '#ff6868' : '#3909C2')}; // TODO: theme
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); // TODO: theme
  border-radius: 0px 20px 20px 0px;
  padding: 1rem 0.75rem;
  width: 100%;
`
const Title = styled.p`
  font-weight: bold;
  letter-spacing: -0.2px;
`
const Member = styled.p`
  font-size: 12px; // TODO: theme
  color: #424242; // TODO: theme
  margin-left: 0.25rem;
`
const ImageWrapper = styled.div<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  position: relative;
  border-radius: 50px;
  overflow: hidden;
`
const Keyword = styled.p`
  background-color: #f5f5f580; // TODO: theme
  color: #757575; // TODO: theme
  border-radius: 10px;
  font-size: 12px; // TODO: theme
`
const EndTime = styled.p`
  color: #757575; // TODO: theme
  font-size: 12px; // TODO: theme
`

export default PartyCard
