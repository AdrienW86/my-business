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
          <Link className={router.pathname === '/factures' ? styles.active : styles.link} href="/factures"> <li className={styles.li}> Factures </li> </Link>        
          <Link className={router.pathname === '/devis' ? styles.active : styles.link} href="/devis"> <li className={styles.li}> Devis </li> </Link> 
          <Link className={router.pathname === '/clients' ? styles.active : styles.link} href="/clients"> <li className={styles.li}> Clients </li> </Link>          
        </ul>               
        <button onClick={navigation} className={styles.disconnect}> Quitter </button> 
     </nav>
  )
}
