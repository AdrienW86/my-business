import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Nav from '@/components/nav';
import ButtonReturn from '@/components/buttonReturn';
import Footer from '@/components/footer';
import { useRouter } from 'next/router';
import styles from './Client.module.css';
import { useUser } from '@/utils/UserContext';

export default function ClientsId() {
  const { user, fetchUserData } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const clientId = parseInt(id);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserData(); // Assurez-vous que les données de l'utilisateur sont chargées
        
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        alert("Erreur lors du chargement des données du client");
      }
    };
  
    fetchData(); // Appelez la fonction fetchData
  }, []);
  

  const Toggle = () => {
    setToggle(!toggle);
  };

  const Toggle2 = () => {
    setToggle2(!toggle2);
  };

  const showInvoice = (id) => {
    router.push(`/factures/[factureId]?id=+${id}`);
  };

  const showDevis = (id) => {
    router.push(`/devis/[devis]?id=+${id}`);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <ButtonReturn url='/clients' />
        <Nav />
        {user && (
          <section className={styles.container}>
            <div className={styles.card}>
              <div className={styles.item}>
                <h1 className={styles.title}> {user.clients[clientId].name} </h1>
                <div className={styles.body_card}>
                  <div>
                    <p>
                      <span className={styles.span}>Téléphone : </span> {user.clients[clientId].phone}
                    </p>
                    <p>
                      <span className={styles.span}>Email : </span> {user.clients[clientId].email}
                    </p>
                  </div>
                  {user.clients[clientId].address && (
                    <div>
                      <p>
                        <span className={styles.span}>Adresse : </span>{' '}
                        {user.clients[clientId].address.number} {user.clients[clientId].address.street}
                      </p>
                      <p>
                        <span className={styles.span}>Ville : </span>{' '}
                        {user.clients[clientId].address.zipcode} {user.clients[clientId].address.city}{' '}
                        {user.clients[clientId].address.country}
                      </p>
                    </div>
                  )}
                  <p className={styles.dash}></p>
                  <div className={styles.box}>
                    <p className={styles.h3}>Factures </p>
                    <p className={styles.h3}>Devis </p>
                  </div>
                  <div className={styles.box}>
                    <button onClick={Toggle} className={styles.btn}>
                      Voir factures
                    </button>
                    <button onClick={Toggle2} className={styles.btn}>
                      Voir devis
                    </button>
                  </div>
                  {toggle && (
                    <section className={styles.list}>
                      <p className={styles.list_title}> </p>
                      <button onClick={Toggle} className={styles.btnClose}>
                        Fermer
                      </button>
                      {user.clients[clientId].invoices.map((el, index) => (
                        <div key={index} className={styles.factures}>
                          <p>
                            Facture numéro <span className={styles.span}> {el.number} </span>{' '}
                          </p>
                          <p>
                            Date : <span className={styles.span}> {el.date} </span>
                          </p>
                          <p>
                            Montant : <span className={styles.span}> {el.total} € </span>
                          </p>
                          <button
                            className={styles.btn_show}
                            onClick={() => showInvoice(el.number)}
                          >
                            Voir
                          </button>
                        </div>
                      ))}
                    </section>
                  )}
                  {toggle2 && (
                    <section className={styles.list}>
                      <p className={styles.list_title}> Devis du client </p>
                      <button onClick={Toggle2} className=''>
                        Fermer
                      </button>
                      {user.clients[clientId].quotes.map((el, index) => (
                        <div key={index} className={styles.factures}>
                          <button onClick={() => showDevis(el.number)}> Voir </button>
                          <p> Devis numéro {el.number} </p>
                          <p> Date : {el.date} </p>
                          <p> Montant : {el.total} €</p>
                        </div>
                      ))}
                    </section>
                  )}
                  <div className={styles.box_delete}>
                    <button className={styles.delete}> Supprimer le client </button>
                  </div>
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
