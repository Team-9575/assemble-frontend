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
import { loginRequest } from '@config/auth'
import { InteractionStatus, InteractionType } from '@azure/msal-browser'

interface IAuthProps {
  children: ReactNode
}
interface IUserInfo {
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
  user: initialUserInfo,
  setUser: (value: IUserInfo) => {
    return
  },
}

const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }: IAuthProps) => {
  const router = useRouter()
  const isMSAuthenticated = useIsAuthenticated()
  const { instance, accounts, inProgress } = useMsal()
  const [MSRefreshToken, setMSRefreshToken] = useState<string | null>(null)
  const [user, setUser] = useState<IUserInfo>(initialUserInfo)
  const { login, result, error } = useMsalAuthentication(
    InteractionType.Silent,
    loginRequest
  )

  useEffect(() => {
    if (inProgress === InteractionStatus.None && !isMSAuthenticated) {
      login()
    }
  }, [inProgress, instance, login, isMSAuthenticated])

  const { mutateAsync, isLoading } = useAuthMutation({
    onSuccess: () => {
      setUser({
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
      setUser({ ...initialUserInfo, isReady: true, isAuthenticated: false })
    },
  })

  useEffect(() => {
    const requestMSToken = () => {
      if (!isMSAuthenticated) {
        Cookies.remove('csrftoken')
        // logout
        setUser({ ...initialUserInfo, isReady: true, isAuthenticated: false })
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
      setUser({ ...initialUserInfo, isReady: true, isAuthenticated: true })
    }
  }, [accounts, MSRefreshToken, isMSAuthenticated])

  useEffect(() => {
    const csrftoken = Cookies.get('csrftoken')
    if (!csrftoken && !!MSRefreshToken) {
      mutateAsync({ token: MSRefreshToken })
    }
  }, [MSRefreshToken, mutateAsync, router])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export default useAuth
