import Button from '@components/common/button'
import HStack from '@components/common/stack/HStack'
import VStack from '@components/common/stack/VStack'
import styled from '@emotion/styled'
import useAuth from '@hooks/context/useAuth'
import { theme } from '@styles/theme'
import PartyCard from './Card'
import { loginRequest } from '@config/auth'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { usePartyListQuery } from '@hooks/query/party/usePartyListQuery'
import { MealType } from './modal/Options'
import { InteractionStatus } from '@azure/msal-browser'
import { useUserQuery } from '@hooks/query/user/useUserQuery'

const PartyList = () => {
  const { auth } = useAuth()
  const { data: user } = useUserQuery()
  const isMsAuthenticated = useIsAuthenticated()
  const { instance, inProgress } = useMsal()
  const { data: partyList, isLoading } = usePartyListQuery()
  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e)
    })
  }

  return (
    <Container>
      <MyPartyContainer>
        <Title>{user?.fullName}님! 같이 먹고, 쉽게 나눠요!</Title>
        <Description>
          방을 직접 만드시거나, 마음에 드는 방에 참여해보세요!
        </Description>
        {!isMsAuthenticated &&
          !auth.isAuthenticated &&
          inProgress === InteractionStatus.None && (
            <Button text="Teams 로그인" onClick={() => handleLogin()} />
          )}
      </MyPartyContainer>
      <PartyListContainer>
        {(isLoading ||
          !!partyList?.filter((party) => party.mealType === MealType.Lunch)
            .length) && (
          <HStack gap="1rem">
            <SelectedTab id="lunch" href="#lunch">
              점심 구해요
              <Underline isLunch />
            </SelectedTab>
            <DefaultTab href="#dinner">저녁 구해요</DefaultTab>
          </HStack>
        )}
        {isLoading ? (
          <VStack margin="1rem 0 0rem 0" gap="0.75rem">
            <PartyCard isLoading isLunch />
            <PartyCard isLoading isLunch />
          </VStack>
        ) : (
          <VStack margin="1rem 0 0rem 0" gap="0.75rem">
            {partyList
              ?.filter((party) => party.mealType === MealType.Lunch)
              .map((party, index) => (
                <PartyCard key={`lunch-${index}`} party={party} isLunch />
              ))}
          </VStack>
        )}
        {(isLoading ||
          !!partyList?.filter((party) => party.mealType === MealType.Dinner)
            .length) && (
          <HStack gap="1rem">
            <DefaultTab href="#lunch">점심 구해요</DefaultTab>
            <SelectedTab id="dinner" href="#dinner">
              저녁 구해요
              <Underline />
            </SelectedTab>
          </HStack>
        )}
        {isLoading ? (
          <VStack margin="1rem 0 2rem 0" gap="0.75rem">
            <PartyCard isLoading />
            <PartyCard isLoading />
          </VStack>
        ) : (
          <VStack margin="1rem 0 2rem 0" gap="0.75rem">
            {partyList
              ?.filter((party) => party.mealType === MealType.Dinner)
              .map((party, index) => (
                <PartyCard key={`dinner-${index}`} party={party} />
              ))}
          </VStack>
        )}
      </PartyListContainer>
      {!isLoading && !partyList?.length && (
        // TODO: style
        <NoPartyText>
          아직 만들어진 방이 없어요!
          <br />
          먼저 만들어보시는 것은 어떨까요?
        </NoPartyText>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`
const MyPartyContainer = styled.section`
  padding: 0.75rem 1rem;
  border-radius: 0px 0px 30px 0px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.background.primary};
`
const Title = styled.div`
  font-weight: bold;
  font-size: ${theme.fontSize.xl};
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.text.primary};
`
const Description = styled.div`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${theme.fontSize.sm};
  letter-spacing: -0.2px;
  margin: 0.25rem 0 0.75rem 0;
`
const PartyListContainer = styled.section`
  padding: 0rem 1rem;
`
const SelectedTab = styled.a`
  font-weight: bold;
  font-size: ${theme.fontSize.lg};
  letter-spacing: -0.6px;
  padding-top: 1.5rem;
  color: ${({ theme }) => theme.text.primary};
`
const DefaultTab = styled.a`
  font-weight: bold;
  font-size: ${theme.fontSize.lg};
  letter-spacing: -0.6px;
  color: ${({ theme }) => theme.text.unselected};
  padding-top: 1.5rem;
`
const Underline = styled.hr<{ isLunch?: boolean }>`
  background-color: ${({ isLunch, theme }) =>
    isLunch ? theme.background.lunch : theme.background.dinner};
  height: 0.25rem;
  border: none;
`
const NoPartyText = styled.p`
  color: #757575;
  text-align: center;
  font-size: ${theme.fontSize.sm};
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export default PartyList
