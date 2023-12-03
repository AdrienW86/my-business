import { connectDb } from "@/utils/database"

connectDb().catch(err=> console.log(err))

export default function App({
  Component,
  pageProps: {...pageProps },
}) {
  return (  
    <Component {...pageProps} />
  )
}
