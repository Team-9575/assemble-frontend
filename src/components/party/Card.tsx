import CircleImage from '@components/common/circle-image'
import HStack from '@components/common/stack/HStack'
import VStack from '@components/common/stack/VStack'
import styled from '@emotion/styled'
import { theme } from '@styles/theme'
import Image from 'next/image'

interface PartyCardProps {
  isLunch?: boolean
  title: string
}

const PartyCard = ({ title, isLunch = false }: PartyCardProps) => {
  return (
    <Container isLunch={isLunch}>
      <HStack gap="0.5rem">
        <CircleImage src="/images/coffee.jpg" alt="party" />
        <VStack gap="0.5rem">
          <Title>{title}</Title>
          <HStack>
            <CircleImage
              src="/images/profile.jpg"
              alt="profile"
              size="1.125rem"
            />
            <CircleImage
              src="/images/profile.jpg"
              alt="profile"
              size="1.125rem"
            />
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

const Container = styled.button<{ isLunch: boolean }>`
  border-left: 4px solid
    ${({ isLunch, theme }) =>
      isLunch ? theme.background.lunch : theme.background.dinner};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0px 20px 20px 0px;
  padding: 1rem 0.75rem;
  width: 100%;
  background-color: ${({ theme }) => theme.background.primary};
`
const Title = styled.p`
  font-weight: bold;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.text.primary};
`
const Member = styled.p`
  font-size: ${theme.fontSize.xs};
  color: ${({ theme }) => theme.text.count};
  margin-left: 0.25rem;
`
const Keyword = styled.p`
  background-color: ${({ theme }) => theme.background.keyword};
  color: ${({ theme }) => theme.text.secondary};
  border-radius: 10px;
  font-size: ${theme.fontSize.xs};
  padding: 0.25rem 0.375rem;
`
const EndTime = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${theme.fontSize.xs};
`

export default PartyCard
