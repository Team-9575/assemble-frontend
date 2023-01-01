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
import { useRouter } from 'next/router'
import { add } from 'date-fns'
import { InteractionStatus, InteractionType } from '@azure/msal-browser'
import { loginRequest } from '@config/auth'

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
  const router = useRouter()
  const isMSAuthenticated = useIsAuthenticated()
  const { accounts, inProgress } = useMsal()
  const [MSRefreshToken, setMSRefreshToken] = useState<string | null>(null)
  const [auth, setAuth] = useState<IAuth>(initialUserInfo)
  useMsalAuthentication(InteractionType.Silent, loginRequest)

  const { mutateAsync, isLoading } = useAuthMutation({
    onSuccess: () => {
      setAuth({
        name: accounts[0]?.name || '',
        isAuthenticated: true,
        isReady: true,
      })
      const isLocal = window.document.location.href.includes('localhost')
      if (isLocal) {
        Cookies.set('csrftoken', process.env.NEXT_PUBLIC_CSRF_TOKEN || '', {
          expires: add(new Date(), { days: 1 }),
        })
      }
    },
    onError: () => {
      setAuth({ ...initialUserInfo, isReady: true, isAuthenticated: false })
    },
  })

  useEffect(() => {
    const requestMSToken = () => {
      if (!isMSAuthenticated && inProgress === InteractionStatus.None) {
        return
      }
      if (accounts.length) {
        const { homeAccountId, environment, idTokenClaims } = accounts[0]
        const sessionKey = `${homeAccountId}-${environment}-refreshtoken-${idTokenClaims?.aud}----`
        const sessionValue = sessionStorage.getItem(sessionKey)
        setMSRefreshToken(sessionValue && JSON.parse(sessionValue).secret)
      }
    }
    requestMSToken()
    if (Cookies.get('csrftoken')) {
      setAuth({ ...initialUserInfo, isReady: true, isAuthenticated: true })
    }
  }, [accounts, MSRefreshToken, isMSAuthenticated, inProgress])

  useEffect(() => {
    const csrftoken = Cookies.get('csrftoken')
    if (!!csrftoken) return
    if (!!MSRefreshToken && isMSAuthenticated) {
      mutateAsync({ token: MSRefreshToken })
    } else {
      setAuth({
        name: '',
        isAuthenticated: false,
        isReady: true,
      })
    }
  }, [MSRefreshToken, mutateAsync, router, isMSAuthenticated])

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
