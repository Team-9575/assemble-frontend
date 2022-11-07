import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { useIsAuthenticated } from '@azure/msal-react'

type AuthProps = {
  children: ReactNode
}

const initialState = {
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {
    return
  },
}

const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }: AuthProps) => {
  const isMSAuthenticated = useIsAuthenticated()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  useEffect(() => setIsAuthenticated(isMSAuthenticated), [isMSAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export default useAuth
