import { getHours } from 'date-fns'
import { useRouter } from 'next/router'
import { useContext, createContext, ReactNode, useState } from 'react'
import route from 'src/constants/route'

type ThemeProps = {
  children: ReactNode
}

const initialState = {
  themeName: 'light',
  setThemeName: (name: 'light' | 'dark') => {
    return
  },
}

const ThemeContext = createContext(initialState)

export const ThemeProvider = ({ children }: ThemeProps) => {
  const router = useRouter()
  const defaultTheme =
    router.pathname === route.main &&
    (getHours(new Date()) >= 18 || getHours(new Date()) <= 6)
      ? 'dark'
      : 'light'
  const [themeName, setThemeName] = useState<'light' | 'dark'>(defaultTheme)

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => {
  const context = useContext(ThemeContext)
  return context
}

export default useTheme
