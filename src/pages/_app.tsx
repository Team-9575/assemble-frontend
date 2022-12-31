import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@hooks/context/useTheme'
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider, useIsAuthenticated, useMsal } from '@azure/msal-react'
import { msalConfig } from '@config/auth'
import { AuthProvider } from '@hooks/context/useAuth'
import { QueryClient, QueryClientProvider } from 'react-query'
import Head from 'next/head'
import { AxiosError } from 'axios'
import apiClient, { HttpStatusCode } from 'src/api'
import { AuthResponseType } from '@hooks/query/auth/useAuthMutation'
import Cookies from 'js-cookie'

export const msalInstance = new PublicClientApplication(msalConfig)

const Components = ({ Component, pageProps }: any) => {
  const isMSAuthenticated = useIsAuthenticated()
  const { instance, accounts, inProgress } = useMsal()
  const muiTheme = createTheme({
    typography: {
      fontFamily: 'Pretendard',
    },
  })
  const refreshToken = async (error: any) => {
    let token = null
    if (!isMSAuthenticated) {
      Cookies.remove('csrftoken')
      // logout
      return
    }
    if (accounts.length) {
      const { homeAccountId, environment, idTokenClaims } = accounts[0]
      const sessionKey = `${homeAccountId}-${environment}-refreshtoken-${idTokenClaims?.aud}----`
      const sessionValue = sessionStorage.getItem(sessionKey)
      token = sessionValue && JSON.parse(sessionValue).secret
    }
    if (!token) {
      // logout
      return
    }
    try {
      const { data } = await apiClient.post<AuthResponseType>('/token/ms', {
        token,
      })
      return data
    } catch (error) {
      // logout
      return Promise.reject(error as AxiosError)
    }
  }
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: (failureCount, error: any) => {
          if (
            failureCount < 3 &&
            error?.response?.status === HttpStatusCode.Unauthorized
          ) {
            refreshToken(error)
            return true
          }
          return false
        },
      },
      mutations: {
        retry: (failureCount, error: any) => {
          if (failureCount < 3 && error?.response?.status === 403) {
            refreshToken(error)
            return true
          }
          return false
        },
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MUIThemeProvider theme={muiTheme}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </MUIThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Assembler</title>
      </Head>
      <MsalProvider instance={msalInstance}>
        <Components Component={Component} pageProps={pageProps} />
      </MsalProvider>
    </>
  )
}

export default MyApp
