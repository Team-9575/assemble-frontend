import styled from '@emotion/styled'
import PartyList from '@components/party'
import Button from '@components/common/button'
import HStack from '@components/common/stack/HStack'
import BaseLayout from '@components/common/base-layout'
import { theme } from '@styles/theme'
import NewPartyModal from '@components/party/modal'
import { useState } from 'react'
import useAuth from '@hooks/context/useAuth'
import CircleImage from '@components/common/circle-image'
import useTheme from '@hooks/context/useTheme'

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { themeName } = useTheme()
  const { auth } = useAuth()

  return (
    <BaseLayout title={themeName}>
      <Container hasFooter={auth.isAuthenticated}>
        <PartyList />
        {auth.isAuthenticated && (
          <Footer>
            <HStack padding="0.25rem 0" justifyContent="center">
              <CircleImage
                src="/images/profile.jpg"
                alt="profile"
                size="1.375rem"
              />
              <CircleImage
                src="/images/profile.jpg"
                alt="profile"
                size="1.375rem"
              />
              <CircleImage
                src="/images/profile.jpg"
                alt="profile"
                size="1.375rem"
              />
            </HStack>
            <Description>현재 8명이 파티를 고민하고 있어요</Description>
            <Button
              text="방 만들기"
              onClick={() => {
                setIsModalOpen(true)
              }}
            />
            {isModalOpen && (
              <NewPartyModal
                isOpen={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false)
                }}
              />
            )}
          </Footer>
        )}
      </Container>
    </BaseLayout>
  )
}
const Container = styled.div<{ hasFooter: boolean }>`
  position: relative;
  padding-bottom: ${({ hasFooter }) => (hasFooter ? '9rem' : '2rem')};
`
const Footer = styled.footer`
  position: fixed;
  padding: 0 1rem 1.5rem;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.2);
  max-width: ${theme.maxWidth};
`
const Description = styled.p`
  font-size: ${theme.fontSize.sm};
  text-align: center;
  margin-bottom: 0.5rem;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.text.primary};
`

export default Home
