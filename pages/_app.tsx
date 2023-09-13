import { AppProps } from 'next/app'
import '../styles/index.css'
import { SessionProvider } from "next-auth/react"

export default function MyApp({ Component, pageProps }: AppProps, { session }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
