import Head from 'next/head'
import { AuthContextProvider } from '../Auth/AuthContext'
import '../styles/globals.css'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthContextProvider>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </AuthContextProvider>
    </>
  )
}

export default MyApp
