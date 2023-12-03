import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Nav from '@/components/nav';
import ButtonReturn from '@/components/buttonReturn';
import Footer from '@/components/footer';
import { useRouter } from 'next/router';
import { user } from '@/data';
import styles from './Client.module.css';

export default function ClientsId() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState({});
  const [address, setAddress] = useState({});
  const [invoice, setInvoice] = useState()

  const [toggle, setToggle] = useState(false)
  const [toggle2, setToggle2] = useState(false)

  
  useEffect(() => {
    if (id) {
      const userId = parseInt(id, 10);
      const userData = user.clients[userId] || {};
      setData(userData);
      
     
      // Assurez-vous que data.adress est défini avant de déstructurer
      const { adress } = userData;
    ;
      if (adress) {
        setAddress(adress);
      }
    }
    else {
      console.log('chargement des données échoué')
    }
    console.log(data)
    
  }, [id]);

  const Toggle = () => {
    setToggle(!toggle)
  }

  const Toggle2 = () => {
    setToggle2(!toggle2)
  }

const showInvoice = (id) => {
  router.push(`/factures/[factureId]?id=+${id}`);
 }

 const showDevis = (id) => {
  router.push(`/devis/[devis]?id=+${id}`);
 }


  return (
    <>
      <Header />     
      <main className={styles.main}>
        <ButtonReturn url ='/clients'/>
        <Nav />
        {data && (
          <section className={styles.container}>
            <div className={styles.card}>
              <div className={styles.item}>
                <h1 className={styles.title}>{data.name}</h1>
                <div className={styles.body_card}>
                    <div>
                  <p><span className={styles.span}>Téléphone : </span> {data.phone}</p>
                  <p><span className={styles.span}>Email : </span> {data.email}</p>
                  </div>
                  {/* Assurez-vous que address est défini avant d'accéder à ses propriétés */}
                  {address && (
                    <div>
                    <p> <span className={styles.span}>Adresse : </span> {address.number} {address.street}</p>
                    <p> <span className={styles.span}>Ville : </span> {address.zipcode} {address.city} ({address.country})</p>
                   <p className={styles.dash}></p>
                   <div className={styles.box}>
                   <p className={styles.h3}>Factures </p>
                    <p className={styles.h3}>Devis  </p>
                    </div>
                    <div className={styles.box}> 
                        <button 
                          onClick={Toggle}
                          className={styles.btn}
                        > Voir factures</button>
                        <button 
                          onClick={Toggle2}
                          className={styles.btn}
                        > Voir devis
                        </button>
                    </div>
                    {toggle &&
                        <section className={styles.list} > 
                          <p className={styles.list_title}> {data.name} </p>
                          
                        
                          <button 
                            onClick={Toggle}
                            className={styles.btnClose}
                            >
                              Fermer
                            </button>
                            {data.factures.map((el, index) => 
                            <div 
                              key={index}
                              className={styles.factures}                               
                              > 
                              
                               <p> Facture numéro <span className={styles.span}> {el.number} </span> </p>
                              <p> Date : <span className={styles.span}> {el.date} </span></p>
                             
                              <p> Montant : <span className={styles.span}> {el.total} € </span></p>   
                              <button 
                                className={styles.btn_show}
                                onClick={() => showInvoice(el.number)} 
                              > Voir 
                              </button>           
                              </div>
                            )}
                        </section>
                    }
                    {toggle2 &&
                        <section className={styles.list} > 
                          <p className={styles.list_title}> Devis du client  </p>
                          <p> {data.name} </p>
                          <button 
                            onClick={Toggle2}
                            className=''
                            >
                              Fermer
                            </button>
                            {data.devis.map((el, index) => 
                            <div 
                                key={index}
                                className={styles.factures}                               
                              > 
                              <button onClick={() => showDevis(el.number)} > Voir </button>
                               <p> Devis numéro {el.number} </p>
                              <p> Date : {el.date} </p>
                             
                              <p> Montant : {el.total} €</p>                   
                              </div>
                            )}
                        </section>
                    }
                    <div className={styles.box_delete}>
                        <button className={styles.delete}> Supprimer le client </button>
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

