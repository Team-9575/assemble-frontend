import type { NextPage } from 'next'
import styled from '@emotion/styled'
import PartyList from '@components/party'
import Button from '@components/common/button'
import Image from 'next/image'
import HStack from '@components/common/stack/HStack'
import BaseLayout from '@components/common/base-layout'
import { theme } from '@styles/theme'
import NewPartyModal from '@components/party/modal'
import { useState } from 'react'
import useAuth from '@hooks/context/useAuth'

const Home: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()

  return (
    <BaseLayout>
      <Container hasFooter={user.isAuthenticated}>
        <PartyList />
        {user.isAuthenticated && (
          <Footer>
            <HStack padding="0.25rem 0" justifyContent="center">
              <ImageWrapper>
                <Image src="/images/profile.jpg" alt="profile" layout="fill" />
              </ImageWrapper>
              <ImageWrapper>
                <Image src="/images/profile.jpg" alt="profile" layout="fill" />
              </ImageWrapper>
              <ImageWrapper>
                <Image src="/images/profile.jpg" alt="profile" layout="fill" />
              </ImageWrapper>
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
const ImageWrapper = styled.div`
  height: 1.375rem;
  width: 1.375rem;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
`
export default Home
