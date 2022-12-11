import styled from '@emotion/styled'
import useAuth from '@hooks/context/useAuth'
import { Drawer, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Navigation from './Navigation'

interface IHeaderProps {
  title: string
  hasHamburgerButton: boolean
  hasBackButton: boolean
}

const Header = ({ title, hasHamburgerButton, hasBackButton }: IHeaderProps) => {
  const { user } = useAuth()
  const router = useRouter()
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  return (
    <Container>
      <Title>{title}</Title>
      <ButtonWrapper>
        {hasBackButton && (
          <IconButton
            aria-label="navigation"
            onClick={() => {
              router.back()
            }}
            sx={{
              position: 'absolute',
              left: '0.5rem',
            }}
          >
            <Icon className="material-symbols-outlined md-16">
              arrow_back_ios
            </Icon>
          </IconButton>
        )}
        {hasHamburgerButton && user.isReady && user.isAuthenticated && (
          <IconButton
            aria-label="navigation"
            onClick={() => {
              setDrawerOpen(true)
            }}
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
              position: 'absolute',
              right: '0.5rem',
            }}
          >
            <Icon className="material-symbols-outlined md-16">menu</Icon>
          </IconButton>
        )}
      </ButtonWrapper>
      {user.isReady && user.isAuthenticated && (
        <Drawer
          anchor="right"
          variant="persistent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 'calc(50vw - 20.5rem)',
              minWidth: '10rem',
            },
          }}
        >
          <NavigationContainer>
            <Navigation width="calc(50vw - 22rem)" maxWidth="16rem" />
          </NavigationContainer>
        </Drawer>
      )}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => {
          setDrawerOpen(false)
        }}
        sx={{
          display: { xs: 'bolck', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            borderRadius: '20px 0px 0px 20px',
          },
        }}
      >
        <Navigation width="80vw" maxWidth="20rem" />
      </Drawer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1.25rem;
  width: 100%;
  z-index: 10;
  background-color: ${({ theme }) => theme.background.primary};
`
const Icon = styled.span`
  color: ${({ theme }) => theme.icon.primary};
`
const NavigationContainer = styled.div`
  background-color: #f2f2f2; // TODO: theme
  height: 100vh;
`
const ButtonWrapper = styled.div`
  height: 2rem;
`
const Title = styled.span`
  font-weight: 600;
`
export default Header
