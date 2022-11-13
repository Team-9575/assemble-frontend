import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@hooks/context/useTheme'
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from '@config/auth'
import { AuthProvider } from '@hooks/context/useAuth'
import { QueryClient, QueryClientProvider } from 'react-query'

export const msalInstance = new PublicClientApplication(msalConfig)

function MyApp({ Component, pageProps }: AppProps) {
  const muiTheme = createTheme({
    typography: {
      fontFamily: 'Pretendard',
    },
  })
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <MsalProvider instance={msalInstance}>
        <AuthProvider>
          <ThemeProvider>
            <MUIThemeProvider theme={muiTheme}>
              <Component {...pageProps} />
            </MUIThemeProvider>
          </ThemeProvider>
        </AuthProvider>
      </MsalProvider>
    </QueryClientProvider>
  )
}

export default MyApp
