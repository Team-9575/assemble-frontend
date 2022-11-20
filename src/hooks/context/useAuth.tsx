import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { useAuthMutation } from '@hooks/query/auth/useAuthMutation'
import apiClient from 'src/api'

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
  const isMSAuthenticated = useIsAuthenticated()
  const { accounts, inProgress } = useMsal()
  const [MSRefreshToken, setMSRefreshToken] = useState<string | null>(null)
  const [user, setUser] = useState<IUserInfo>(initialUserInfo)
  const { mutateAsync, isLoading } = useAuthMutation({
    onSuccess: ({ accessToken }) => {
      setUser({
        name: accounts[0]?.name || '',
        isAuthenticated: true,
        isReady: true,
      })
      apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    },
    onError: () => {
      setUser({ ...initialUserInfo, isReady: true })
    },
  })

  useEffect(() => {
    const requestMSToken = () => {
      if (!isMSAuthenticated) {
        setUser({ ...initialUserInfo, isReady: true })
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
  }, [accounts, MSRefreshToken, isMSAuthenticated])

  useEffect(() => {
    if (!!MSRefreshToken) {
      mutateAsync({ token: MSRefreshToken })
    }
  }, [MSRefreshToken, mutateAsync])

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
