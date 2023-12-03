import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/ButtonReturn.module.css'

export default function buttonReturn(props) {

  const router = useRouter();

  const navigation = (url) => {
    router.push(`${url}`);
   }

  return (
    <button
      onClick={() => navigation(props.url)}
      className={styles.return}> retour</button>
  )
}
