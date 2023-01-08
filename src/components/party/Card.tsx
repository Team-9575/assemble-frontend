import CircleImage from '@components/common/circle-image'
import HStack from '@components/common/stack/HStack'
import VStack from '@components/common/stack/VStack'
import styled from '@emotion/styled'
import { IParty } from '@hooks/query/party/usePartyListQuery'
import { Skeleton } from '@mui/material'
import { theme } from '@styles/theme'
import { format, sub } from 'date-fns'
import Router from 'next/router'
import route from 'src/constants/route'

interface PartyCardProps {
  party?: IParty
  isLoading?: boolean
  isLunch?: boolean
  isClosed?: boolean
}

const PartyCard = ({
  party,
  isLoading,
  isLunch = false,
  isClosed = false,
}: PartyCardProps) => {
  return (
    <Container
      isLunch={isLunch}
      onClick={() => {
        if (!!party?.id) Router.push(route.partyDetail(party.id))
      }}
    >
      <HStack gap="0.5rem">
        <CircleImage
          src="/images/coffee.jpg"
          alt="party"
          isLoading={isLoading}
        />
        <VStack gap="0.5rem">
          <Title>
            {isLoading ? <Skeleton width="10rem" height="1rem" /> : party?.name}
          </Title>
          <HStack>
            <CircleImage
              src="/images/profile.jpg"
              alt="profile"
              size="1.125rem"
              isLoading={isLoading}
            />
            <Member>
              {isLoading ? (
                <Skeleton width="6rem" />
              ) : (
                `${party?.currentUserCount}명 참여 중`
              )}
            </Member>
          </HStack>
        </VStack>
      </HStack>
      <HStack margin="1.25rem 0 0 0" justifyContent="space-between">
        <HStack gap="0.25rem">
          {isLoading ? (
            <>
              <Skeleton width="3rem" />
              <Skeleton width="3rem" />
            </>
          ) : (
            party?.tags.map((tag) => (
              <Keyword key={tag.id}>#{tag.name}</Keyword>
            ))
          )}
        </HStack>
        <EndTime>
          {isLoading || !party?.gatherClosedAt ? (
            <Skeleton width="6rem" />
          ) : (
            format(
              sub(new Date(party?.gatherClosedAt), { hours: 9 }),
              isClosed ? 'yyyy.MM.dd' : 'b hh:mm까지'
            )
          )}
        </EndTime>
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
