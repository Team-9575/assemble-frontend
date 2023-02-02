import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from '@config/auth'
import { AuthProvider } from '@hooks/context/useAuth'
import { QueryClient, QueryClientProvider } from 'react-query'
import Head from 'next/head'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from '@hooks/context/useTheme'

export const msalInstance = new PublicClientApplication(msalConfig)

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // refetchOnWindowFocus: false,
      },
      mutations: {},
    },
  })
  const muiTheme = createTheme({
    typography: {
      fontFamily: 'Pretendard',
    },
  })
  return (
    <>
      <Head>
        <title>Assembler</title>
      </Head>
      <MsalProvider instance={msalInstance}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <MUIThemeProvider theme={muiTheme}>
              <AuthProvider>
                <Component {...pageProps} />
              </AuthProvider>
            </MUIThemeProvider>
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </MsalProvider>
    </>
  )
}

export default MyApp
