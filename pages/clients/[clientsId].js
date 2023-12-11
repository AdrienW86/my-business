import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { useRouter } from 'next/router';
import styles from './Client.module.css';
import { useUser } from '@/utils/UserContext';
import UpdateClientForm from '@/components/updateClient';
import Invoice from '@/components/invoice';
import Quote from '@/components/quote';

export default function ClientsId() {
  const { user, fetchUserData } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const clientId = parseInt(id);

  const [toggle, setToggle] = useState(false);
  const [invoices, setInvoices] = useState(false);
  const [quotes, setQuotes] = useState(false);
  const [oneInvoice, setOneInvoice] = useState(false)
  const [oneQuote, setOneQuote] = useState(false)

  const [invoiceId, setInvoiceId] = useState()
  
  const updateClient = async (clientId, formData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/update-client?clientId=${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: {
            number: formData.address.number,
            street: formData.address.street,
            city: formData.address.city,
            zipcode: formData.address.zipcode,
            country: formData.address.country,
          },
        }),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
      } else {
        console.error('Error updating client:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating client:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserData();    
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        alert("Erreur lors du chargement des données du client");
      }
    }; 
    fetchData(); 
  }, []);

  const deleteClient = async (clientId) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer ${user.clients[clientId].name} ?` );        
    if (confirmDelete) {
      const token = localStorage.getItem('token');
        try { 
          const response = await fetch(`/api/delete-client?clientId=${clientId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            router.push('/clients')
          } else {
            console.error('Error deleting client:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting client:', error.message);
        }
    }
  };
  
  const Toggle = () => {
    setToggle(!toggle);
  };

  const showInvoice = (index) => {
    setOneInvoice(!oneInvoice)
    setInvoiceId(index)
  }

  const showQuote = (index) => {
    setOneQuote(!oneQuote)
    setInvoiceId(index)
  }
 
  const showInvoices = () => {
    setInvoices(!invoices)
  }

  const showQuotes = () => {
    setQuotes(!quotes)
  }

  return (
    <>
      <Header />
      <main className={styles.main}>     
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
                    <button  onClick={showInvoices} className={styles.btn}>
                      Voir factures
                    </button>
                    <button onClick={showQuotes} className={styles.btn}>
                      Voir devis
                    </button>
                  </div>                
                  <div className={styles.box_delete}>
                    <button className={styles.update} onClick={Toggle}>Mettre à jour</button>  
                    <button className={styles.delete} onClick={() =>deleteClient(clientId)}> Supprimer </button>                                  
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>    
      {toggle &&
        <UpdateClientForm clientId ={clientId} updateClient={updateClient} />
      }
      {invoices && 
        <section className={styles.modal}>
        <h2 className={styles.modalTitle}> Facture {user.clients[clientId].name}</h2> 
        <button className={styles.btnClose}onClick={showInvoices}>X</button>
        {user.clients[clientId].invoices.length === 0 ? <p className={styles.warning}> Aucun élément à afficher</p> :
          <div className={styles.documentsContainer}>      
            {user.clients[clientId].invoices.map((el, index) => (
              <div 
                key= {index}
                className={styles.listModal}
              > 
                <h3 className={styles.h3}> {index} Facture n° 202{el.index} </h3>
                <p className={styles.p}> Date: <span className={styles.spanDate}>{el.dateValue} </span> </p>
                <p className={styles.p}> Montant: <span className={styles.spanPrice}> {el.totalTTC} </span>  </p>
                <button className={styles.modalBtn} onClick={() => showInvoice(index)}> Voir </button>
              </div>
            ))}
          </div>
        }
     </section>
      }
      {quotes && 
       <section className={styles.modal}>
        <h2 className={styles.modalTitle}> Devis de {user.clients[clientId].name}</h2> 
        <button className={styles.btnClose}onClick={showQuotes}> X</button>
        {user.clients[clientId].quotes.length === 0 ? <p className={styles.warning}> Aucun élément à afficher</p> :
          <div className={styles.documentsContainer}>
            {user.clients[clientId].quotes.map((el, index) => (
              <div 
                key= {index}
                className={styles.listModal}
              > 
                <h3 className={styles.h3}> Devis n° 202{el.index} </h3>
                <p className={styles.p}> Date: <span className={styles.spanDate}>{el.dateValue} </span> </p>
                <p className={styles.p}> Montant: <span className={styles.spanPrice}> {el.totalTTC} </span>  </p>
                <button className={styles.modalBtn} onClick={() => showQuote(index)}> Voir</button>
              </div>
            ))}
          </div>
        } 
     </section>
      }
       {oneInvoice && <Invoice user ={user} clientId = {clientId} invoiceId ={invoiceId} data ={invoices} toggle={showInvoice}/>}
       {oneQuote && <Quote user ={user} clientId = {clientId} invoiceId ={invoiceId} data ={quotes} toggle={showQuote}/>}
      <Footer />
    </>
  );
}
