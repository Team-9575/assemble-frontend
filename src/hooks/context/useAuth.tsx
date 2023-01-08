import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import {
  useIsAuthenticated,
  useMsal,
  useMsalAuthentication,
} from '@azure/msal-react'
import { useAuthMutation } from '@hooks/query/auth/useAuthMutation'
import Cookies from 'js-cookie'
import { add } from 'date-fns'
import { InteractionStatus, InteractionType } from '@azure/msal-browser'
import { loginRequest } from '@config/auth'
import Router from 'next/router'

interface IAuthProps {
  children: ReactNode
}
interface IAuth {
  name: string
  isAuthenticated: boolean
  isReady: boolean
}

const initialUserInfo = {
  name: '',
  isAuthenticated: false,
  isReady: false,
}

const initialState = {
  auth: initialUserInfo,
  setAuth: (value: IAuth) => {
    return
  },
}

const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }: IAuthProps) => {
  const isMsAuthenticated = useIsAuthenticated()
  const { accounts, inProgress } = useMsal()
  const [msRefreshToken, setMsRefreshToken] = useState<string | null>(null)
  const [auth, setAuth] = useState<IAuth>(initialUserInfo)
  useMsalAuthentication(InteractionType.Silent, loginRequest)

  const { mutateAsync, isLoading } = useAuthMutation({
    onSuccess: () => {
      setAuth({
        name: accounts[0]?.name || '',
        isAuthenticated: true,
        isReady: true,
      })
      const csrf = Cookies.get('csrftoken')
      if (!csrf) {
        Router.reload()
      }
      const isLocal = window.document.location.href.includes('localhost')
      if (isLocal) {
        Cookies.set('csrftoken', process.env.NEXT_PUBLIC_DUMMY_CSRF || '', {
          expires: add(new Date(), { days: 1 }),
        })
      }
    },
    onError: () => {
      setAuth({ ...initialUserInfo, isReady: true, isAuthenticated: false })
    },
  })

  useEffect(() => {
    console.log('inprogress', inProgress)
    const requestMSToken = () => {
      if (!isMsAuthenticated && inProgress === InteractionStatus.None) {
        return
      }
      if (accounts.length) {
        const { homeAccountId, environment, idTokenClaims } = accounts[0]
        const sessionKey = `${homeAccountId}-${environment}-refreshtoken-${idTokenClaims?.aud}----`
        const sessionValue = sessionStorage.getItem(sessionKey)
        setMsRefreshToken(sessionValue && JSON.parse(sessionValue).secret)
      }
    }
    requestMSToken()
    if (Cookies.get('csrftoken')) {
      setAuth({ ...initialUserInfo, isReady: true, isAuthenticated: true })
    }
  }, [accounts, msRefreshToken, isMsAuthenticated, inProgress])

  useEffect(() => {
    const csrftoken = Cookies.get('csrftoken')
    if (!!csrftoken) return
    if (!!msRefreshToken && isMsAuthenticated) {
      mutateAsync({ token: msRefreshToken })
    } else {
      setAuth({
        name: '',
        isAuthenticated: false,
        isReady: true,
      })
    }
  }, [msRefreshToken, mutateAsync, isMsAuthenticated])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export default useAuth
