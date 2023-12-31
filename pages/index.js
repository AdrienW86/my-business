import Image from 'next/image'
import Logo from '../assets/wallpapers.png'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import Login from '@/components/login'
import Footer from '../components/footer'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 
  return (
    <>
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