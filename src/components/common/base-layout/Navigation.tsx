import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import HStack from '../stack/HStack'
import { theme } from '@styles/theme'
import { useMsal } from '@azure/msal-react'
import VStack from '../stack/VStack'
import route from 'src/constants/route'
import CircleImage from '../circle-image'
import { IUserResponse } from '@hooks/query/user/useUserQuery'
import { logout } from '@hooks/query'
import Router from 'next/router'
import useTheme from '@hooks/context/useTheme'

interface INavigationProps {
  width: string
  maxWidth: string
  user?: IUserResponse
}

const menuItem = [
  {
    name: '지나간 파티 보기',
    path: route.closedParties,
  },
  {
    name: '나의 계좌',
    path: route.myBankAccount,
  },
  {
    name: '나의 리뷰',
    path: route.myReview,
  },
]

const Navigation = ({ width, maxWidth, user }: INavigationProps) => {
  const { instance } = useMsal()
  const { themeName, setThemeName } = useTheme()
  const handleMsLogout = async () => {
    await logout()
    instance.logoutRedirect({
      postLogoutRedirectUri: '/',
    })
  }
  return (
    <Container width={width} maxWidth={maxWidth}>
      <VStack justifyContent="space-between">
        <VStack>
          <HStack alignItems="center" gap="0.5rem" padding="0 1rem">
            <CircleImage src={user?.profilePic} alt="user" />
            <Name>{user?.fullName}</Name>
          </HStack>
          <VStack margin="1rem 0 0">
            {menuItem.map((menu) => (
              <Menu
                key={menu.name}
                onClick={() => {
                  Router.push(menu.path)
                }}
              >
                {menu.name}
              </Menu>
            ))}
          </VStack>
        </VStack>
        <Button
          sx={{ margin: '0 auto', color: '#757575', fontWeight: '600' }}
          onClick={() => {
            setThemeName(themeName === 'dark' ? 'light' : 'dark')
          }}
        >
          {themeName}
        </Button>
        <Button
          sx={{ margin: '0 auto', color: '#757575', fontWeight: '600' }}
          onClick={() => {
            handleMsLogout()
          }}
        >
          로그아웃
        </Button>
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
