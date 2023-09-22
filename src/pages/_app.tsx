import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import './index.css'
// import Header from '@/components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
