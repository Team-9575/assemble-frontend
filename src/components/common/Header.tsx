import styled from '@emotion/styled'
import useTheme from '@hooks/context/useTheme'
import { Drawer, IconButton } from '@mui/material'
import { useState } from 'react'
import Navigation from './Navigation'

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  return (
    <Container>
      <ButtonWrapper>
        <IconButton
          aria-label="navigation"
          onClick={() => {
            setDrawerOpen(true)
          }}
          sx={{
            display: { xs: 'inline-flex', md: 'none' },
          }}
        >
          <MenuIcon className="material-symbols-outlined md-16">menu</MenuIcon>
        </IconButton>
      </ButtonWrapper>
      <Drawer
        anchor="right"
        variant="persistent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 'calc(50vw - 20rem)',
            minWidth: '10rem',
          },
        }}
      >
        <NavigationContainer>
          <Navigation width="calc(50vw - 22rem)" maxWidth="16rem" />
        </NavigationContainer>
      </Drawer>
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
  justify-content: right;
  padding: 0.75rem 1.25rem;
  width: 100%;
  z-index: 10;
  background-color: ${({ theme }) => theme.background.primary};
`
const MenuIcon = styled.span`
  color: ${({ theme }) => theme.icon.primary};
`
const NavigationContainer = styled.div`
  background-color: #f2f2f2; // TODO: theme
  height: 100vh;
`
const ButtonWrapper = styled.div`
  height: 2rem;
`
export default Header
