import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@hooks/context/useTheme'
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from '../config/auth'

export const msalInstance = new PublicClientApplication(msalConfig)

function MyApp({ Component, pageProps }: AppProps) {
  const muiTheme = createTheme({
    typography: {
      fontFamily: 'Pretendard',
    },
  })
  return (
    <MsalProvider instance={msalInstance}>
      <ThemeProvider>
        <MUIThemeProvider theme={muiTheme}>
          <Component {...pageProps} />
        </MUIThemeProvider>
      </ThemeProvider>
    </MsalProvider>
  )
}

export default MyApp
