import React from 'react'
import Image from 'next/image'
import Logo from '../assets/logo.png'
import Link from 'next/link'
import styles from '../styles/Header.module.css'

export default function Header() {
  return (
   <header className={styles.header}>
      <section className={styles.logo_container} >  
      <Link href="/profil">               
          <Image 
            src={Logo}
            height={100}
            width={100}
            alt='logo'
            priority
          />
        </Link>
      </section>          
   </header>
  )
}
