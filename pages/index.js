import Head from 'next/head'
import Image from 'next/image'
import Logo from '../assets/wallpaper.png'
import { Inter } from 'next/font/google'
import Login from '@/components/login'
import Footer from '../components/footer'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <Head>
        <title>My Busine$$</title>
        <meta name="description" content="Gérer efficacement votre business" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>    
      <main className={`${styles.main} ${inter.className}`}>
        <section className={styles.banner}>
          <Image  
            width={270}
            height={270} 
            src={Logo} 
            alt="image de fond" 
            className={styles.wallpaper}
          />
        </section>  
        <Login/>                                      
      </main>
      <Footer />
    </>
  )
}