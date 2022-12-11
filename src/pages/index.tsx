import type { GetServerSideProps, NextPage } from 'next'
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
import { useQuery } from 'react-query'
import Cookies from 'js-cookie'
import apiClient from 'src/api'
import CircleImage from '@components/common/circle-image'

const Home: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()
  const csrf = Cookies.get('csrftoken')
  // TODO: remove
  const { data } = useQuery({
    queryKey: [csrf],
    enabled: !!csrf,
    queryFn: async () => {
      await apiClient.get('/users/me')
    },
  })

  return (
    <BaseLayout>
      <Container hasFooter={user.isAuthenticated}>
        <PartyList />
        {user.isAuthenticated && (
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
