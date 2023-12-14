import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from '../styles/Nav.module.css'

export default function nav() {
  const router = useRouter();

  const navigation =() => {
    localStorage.clear()
    router.push('/')
  }

  return (
    <nav className={styles.nav}>           
        <ul className={styles.ul}>  
         <Link className={router.pathname === '/factures' ? styles.active : styles.li} href="/factures"> Factures </Link>      
         <Link className={router.pathname === '/devis' ? styles.active : styles.li} href="/devis">  Devis  </Link>
         <Link className={router.pathname === '/clients' ? styles.active : styles.li} href="/clients"> Clients </Link>  
        </ul>               
        <button onClick={navigation} className={styles.disconnect}> Quitter </button> 
     </nav>
  )
}
