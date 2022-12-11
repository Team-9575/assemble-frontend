import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import HStack from '../stack/HStack'
import { theme } from '@styles/theme'
import { useMsal } from '@azure/msal-react'
import VStack from '../stack/VStack'
import route from 'src/constants/route'
import { useRouter } from 'next/router'
import CircleImage from '../circle-image'

interface INavigationProps {
  width: string
  maxWidth: string
}

const menuItem = [
  {
    name: '지나간 파티 보기',
    path: route.myParties,
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

const Navigation = ({ width, maxWidth }: INavigationProps) => {
  const router = useRouter()
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
            <CircleImage src="/images/coffee.jpg" alt="party" />
            <Name>Sally Lee</Name>
          </HStack>
          <VStack margin="1rem 0 0">
            {menuItem.map((menu) => (
              <Menu
                key={menu.name}
                onClick={() => {
                  router.push(menu.path)
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
  padding: 4rem 1rem 6rem;
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
  padding-left: 1rem;
  :hover {
    background-color: #3909c210; // TODO:: theme
  }
`

export default Navigation
