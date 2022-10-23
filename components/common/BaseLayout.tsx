import styled from '@emotion/styled'
import Header from '@components/common/Header'
import useTheme from '@hooks/context/useTheme'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { darkTheme } from '@styles/theme/dark'
import { lightTheme } from '@styles/theme/light'
import { theme } from '@styles/theme'

const BaseLayout = ({ children }: { children: JSX.Element }) => {
  const { themeName } = useTheme()

  return (
    <EmotionThemeProvider theme={themeName === 'dark' ? darkTheme : lightTheme}>
      <Container>
        <Header />
        {children}
      </Container>
    </EmotionThemeProvider>
  )
}
const Container = styled.header`
  position: relative;
  margin: 0 0 8.125rem 0;
  max-width: ${theme.maxWidth};
  background-color: ${({ theme }) => theme.background.secondary};
  margin: 0 auto;
`

export default BaseLayout
