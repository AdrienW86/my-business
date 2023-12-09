import { UserProvider } from '@/utils/UserContext'

export default function App({
  Component,
  pageProps: {...pageProps },
}) {
  return (  
    <UserProvider>
        <Component {...pageProps} />
    </UserProvider>
  )
}
