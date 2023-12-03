import React from 'react'
import Link from 'next/link'
import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link className={styles.link} href="https://code-v.fr">
        <p> Réalisé par <span className={styles.span}> Codev </span></p>
      </Link>
       
    </footer>
  )
}
