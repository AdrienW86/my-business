import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Nav from '@/components/nav';
import ButtonReturn from '@/components/buttonReturn';
import Footer from '@/components/footer';
import { useRouter } from 'next/router';
import { user } from '@/data';
import styles from './Devis.module.css';

export default function DevisId() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState({});
  const [address, setAddress] = useState({});

  useEffect(() => {
    if (id) {
      const userId = parseInt(id, 10);
      const userData = user.devis[userId] || {};
      setData(userData);

      // Assurez-vous que data.adress est défini avant de déstructurer
      const { adress } = userData;
      if (adress) {
        setAddress(adress);
      }
    }
  }, [id]);

  return (
    <>
      <Header />
      <main className={styles.main}>
      <ButtonReturn url ='/devis'/>
        <Nav />
        {data && (
          <section className={styles.container}>
            <div className={styles.card}>
              <div className={styles.item}>
                <h1 className={styles.title}>{data.name}</h1>
                <div className={styles.body_card}>
                    <div>
                  <p><span className={styles.span}>Date : </span> {data.date}</p>
                  <p><span className={styles.span}>Email : </span> {data.email}</p>
                  </div>
                  {/* Assurez-vous que address est défini avant d'accéder à ses propriétés */}
                  {address && (
                    <div>
                    <p> <span className={styles.span}>Adresse : </span> {address.number} {address.street}</p>
                    <p> <span className={styles.span}>Ville : </span> {address.zipcode} {address.city} ({address.country})</p>
                   <p className={styles.dash}></p>
                   <div className={styles.box}>
                   
                    <p className={styles.h3}> Télécharger le devis  </p>
                    </div>
                    <div className={styles.box}> 
                        <button className={styles.btn}> Télécharger </button>
                    </div>
                    <div className={styles.box_delete}>
                        <button className={styles.delete}> Supprimer le devis </button>
                   </div>   
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}