import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@hooks/context/useTheme'
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material'
import { InteractionStatus, PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider, useIsAuthenticated, useMsal } from '@azure/msal-react'
import { msalConfig } from '@config/auth'
import { AuthProvider } from '@hooks/context/useAuth'
import { QueryClient, QueryClientProvider } from 'react-query'
import Head from 'next/head'
import axios, { AxiosError } from 'axios'
import apiClient, { HttpStatusCode } from 'src/api'
import { AuthResponseType } from '@hooks/query/auth/useAuthMutation'
import Cookies from 'js-cookie'

export const msalInstance = new PublicClientApplication(msalConfig)

export const logout = async () => {
  Cookies.remove('csrftoken')
  console.log('logout!!')
  await apiClient.post('/logout')
}

const Components = ({ Component, pageProps }: any) => {
  const isMSAuthenticated = useIsAuthenticated()
  const { accounts, inProgress } = useMsal()

  const muiTheme = createTheme({
    typography: {
      fontFamily: 'Pretendard',
    },
  })

  const refreshToken = async (error: any) => {
    if (!isMSAuthenticated && inProgress === InteractionStatus.None) {
      logout()
      console.log(
        'logout - refreshToken - !isMSAuthenticated',
        isMSAuthenticated,
        inProgress
      )
      return
    }
    let token = null
    if (accounts.length) {
      const { homeAccountId, environment, idTokenClaims } = accounts[0]
      const sessionKey = `${homeAccountId}-${environment}-refreshtoken-${idTokenClaims?.aud}----`
      const sessionValue = sessionStorage.getItem(sessionKey)
      token = sessionValue && JSON.parse(sessionValue).secret
    }
    if (!token) {
      // logout()
      // console.log(
      //   'logout - refreshToken - no ms token',
      //   isMSAuthenticated,
      //   inProgress
      // )
      return
    }
    try {
      const { data } = await apiClient.post<AuthResponseType>('/token/ms', {
        token,
      })
      return data
    } catch (error) {
      logout()
      console.log('refreshToken - axios error')
      return Promise.reject(error as AxiosError)
    }
  }

  const handleRetry = (failureCount: number, error: any) => {
    if (
      failureCount < 3 &&
      error?.response?.status === HttpStatusCode.Unauthorized
    ) {
      refreshToken(error)
      return true
    }
    return false
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: handleRetry,
      },
      mutations: {
        retry: handleRetry,
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
