import styled from '@emotion/styled'
import Header from '@components/common/base-layout/Header'
import useTheme from '@hooks/context/useTheme'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { darkTheme } from '@styles/theme/dark'
import { lightTheme } from '@styles/theme/light'
import { theme } from '@styles/theme'
import useAuth from '@hooks/context/useAuth'

interface IBaseLayoutProps {
  children: JSX.Element
  title?: string
}

const BaseLayout = ({ children, title }: IBaseLayoutProps) => {
  const { themeName } = useTheme()
  const { user } = useAuth()

  return (
    <EmotionThemeProvider theme={themeName === 'dark' ? darkTheme : lightTheme}>
      <Container>
        <Header title={title} />
        {children}
      </Container>
    </EmotionThemeProvider>
  )
}
const Container = styled.div`
  position: relative;
  max-width: ${theme.maxWidth};
  min-width: 15.625rem;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background.secondary};
  margin: 0 auto;
`

export default BaseLayout
