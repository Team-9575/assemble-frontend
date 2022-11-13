import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { useAuthMutation } from '@hooks/query/auth/useAuthMutation'
import { loginRequest } from '@config/auth'
import apiClient from 'src/api'

interface IAuthProps {
  children: ReactNode
}
interface IUserInfo {
  accessToken: string
  name: string
  isAuthenticated: boolean
  isReady: boolean
}

const initialUserInfo = {
  accessToken: '',
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
  const { instance, accounts, inProgress } = useMsal()
  const [MSAccessToken, setMSAccessToken] = useState<any>(null)
  const [user, setUser] = useState<IUserInfo>(initialUserInfo)
  const { mutateAsync, isLoading } = useAuthMutation({
    onSuccess: ({ accessToken }) => {
      setUser({
        accessToken: accessToken,
        name: accounts[0]?.name || '',
        isAuthenticated: !!accessToken,
        isReady: true,
      })
      apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    },
    onError: () => {
      setUser({ ...initialUserInfo, isReady: true })
    },
  })

  useEffect(() => {
    const requestAccessToken = () => {
      if (!isMSAuthenticated) {
        setUser({ ...initialUserInfo, isReady: true })
        return
      }
      const request = { ...loginRequest, account: accounts[0] }
      instance
        .acquireTokenSilent(request)
        .then((response) => {
          setMSAccessToken(response.accessToken)
        })
        .catch((e) => {
          instance.acquireTokenPopup(request).then((response) => {
            setMSAccessToken(response.accessToken)
          })
        })
    }
    requestAccessToken()
  }, [mutateAsync, accounts, instance, MSAccessToken, isMSAuthenticated])

  useEffect(() => {
    if (!!MSAccessToken) {
      mutateAsync({ token: MSAccessToken })
    }
  }, [MSAccessToken, mutateAsync])

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
