import '../styles/globals.css'
import type { AppProps } from 'next/app'
import useTheme, { ThemeProvider } from '@hooks/context/useTheme'
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
  const muiTheme = createTheme({
    typography: {
      fontFamily: 'Pretendard',
    },
  })
  return (
    <ThemeProvider>
      <MUIThemeProvider theme={muiTheme}>
        <Component {...pageProps} />
      </MUIThemeProvider>
    </ThemeProvider>
  )
}

export default MyApp
