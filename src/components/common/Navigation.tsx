import styled from '@emotion/styled'
import VStack from './VStack'
import Button from '@mui/material/Button'
import Image from 'next/image'
import HStack from './HStack'
import { theme } from '@styles/theme'
import { useMsal } from '@azure/msal-react'

interface INavigationProps {
  width: string
  maxWidth: string
}

const menuItem = [
  {
    name: '지나간 파티 보기',
    path: '/',
  },
  {
    name: '나의 계좌',
    path: '/',
  },
  {
    name: '나의 리뷰',
    path: '/',
  },
]

const Navigation = ({ width, maxWidth }: INavigationProps) => {
  const { instance } = useMsal()
  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: '/',
    })
  }
  return (
    <Container width={width} maxWidth={maxWidth}>
      <VStack justifyContent="space-between">
        <VStack>
          <HStack alignItems="center" gap="0.5rem">
            <ImageWrapper>
              <Image src="/images/coffee.jpg" alt="party" layout="fill" />
            </ImageWrapper>
            <Name>Sally Lee</Name>
          </HStack>
          <VStack margin="1rem 0 0">
            {menuItem.map((menu) => (
              <Menu key={menu.name}>{menu.name}</Menu>
            ))}
          </VStack>
        </VStack>
        <Button
          sx={{ margin: '0 auto', color: '#757575', fontWeight: '600' }}
          onClick={() => {
            handleLogout()
          }}
        >
          로그아웃
        </Button>
        {/* TODO: theme */}
      </VStack>
    </Container>
  )
}

const Container = styled.div<{ width: string; maxWidth: string }>`
  background-color: #ffffff;
  height: 100vh;
  width: ${({ width }) => width};
  max-width: ${({ maxWidth }) => maxWidth};
  padding: 4rem 0 6rem;
`
const ImageWrapper = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  margin-left: 1rem;
`
const Name = styled.span`
  font-size: ${theme.fontSize.lg};
  font-weight: bold;
`
const Menu = styled.button`
  font-size: ${theme.fontSize.md};
  height: 3rem;
  display: block;
  width: 100%;
  text-align: left;
  padding-left: 2rem;
  :hover {
    background-color: #3909c210; // TODO:: theme
  }
`

export default Navigation
