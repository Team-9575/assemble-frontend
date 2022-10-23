import { useContext, createContext, ReactNode, useState } from 'react'

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
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light')

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
