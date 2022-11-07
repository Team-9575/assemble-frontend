import type { NextPage } from 'next'
import styled from '@emotion/styled'
import Button from '@components/common/Button'
import BaseLayout from '@components/common/BaseLayout'
import { theme } from '@styles/theme'
import NewPartyModal from '@components/party/NewPartyModal'
import { useEffect, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { useIsAuthenticated } from '@azure/msal-react'

const LogoutPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { instance } = useMsal()
  const isAuthenticated = useIsAuthenticated()
  const [isAuth, setIsAuth] = useState(false)
  useEffect(() => setIsAuth(isAuthenticated), [isAuthenticated])

  const handleLogout = (logoutType: any) => {
    if (logoutType === 'redirect') {
      instance.logoutRedirect({
        postLogoutRedirectUri: '/',
      })
    }
  }

  return (
    <BaseLayout>
      <Container>
        <Footer>
          <Button
            text={isAuth ? 'logout' : 'login'}
            onClick={() => {
              // setIsModalOpen(true)
              handleLogout('redirect')
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
      </Container>
    </BaseLayout>
  )
}
const Container = styled.header`
  position: relative;
  padding: 0 0 9rem 0;
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
export default LogoutPage
