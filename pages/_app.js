import { UserProvider } from '@/utils/UserContext'
import Head from 'next/head'

export default function App({
  Component,
  pageProps: {...pageProps },
}) {
  return (  
    <UserProvider>
      <Head>
        <title>My Busine$$</title>
        <meta name="description" content="Gérer efficacement votre business" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>    
        <Component {...pageProps} />
    </UserProvider>
  )
}
