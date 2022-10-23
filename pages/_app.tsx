import '../styles/globals.css'
import type { AppProps } from 'next/app'
import useTheme, { ThemeProvider } from '@hooks/context/useTheme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
