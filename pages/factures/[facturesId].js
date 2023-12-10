import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Nav from '@/components/nav';
import ButtonReturn from '@/components/buttonReturn';
import Footer from '@/components/footer';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/UserContext';
import { generatePdf }  from '@/utils/generatePdf';
import styles from './Facture.module.css';

export default function FacturesId() {

  const { user, fetchUserData } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const userId = parseInt(id, 10);

  const [prestations, setPrestations] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserData();
        if (user && user.invoices[userId] && user.invoices[userId].services) {
          setPrestations(user.invoices[userId].services);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        alert("Erreur lors du chargement des données du client");
      }
    }; 
    fetchData();
  }, [userId]);

  const formatDecimal = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const navigation = () => {
    router.push('/factures');
  }

  const handleDeleteInvoice = async (userId) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer cette facture ?` );        
    if (confirmDelete) {
      const token = localStorage.getItem('token');
        try { 
          const response = await fetch(`/api/delete-invoice?clientId=${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            router.push('/factures')
          } else {
            console.error('Error deleting invoice:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting invoice:', error.message);
        }
    }
  }

  const download = () => {
    const bills = user.invoices[userId]
    generatePdf(bills)
  }
 
  return (
    <>
      <Header />
      <main className={styles.main}>
      <ButtonReturn url ='/factures'/>
        <Nav />
        {user && (
          <section className={styles.container}>
             <button className={styles.btnClose} onClick={navigation}> X </button>
            <div className={styles.card}>
              <div className={styles.item}>
                <h1 className={styles.title}>{user.invoices[userId].title}</h1>
                <div className={styles.body_card}>
                  <div className={styles.label}>
                    <p className={styles.h3}> Vendeur: </p>
                    <p className={styles.h4}> Client: </p> 
                  </div>
                  <div className={styles.boxInfos}>
                    <p className={styles.span}> {user.invoices[userId].user} </p>
                    <p className={styles.infos}> Siret: {user.siret} </p>
                    <p className={styles.infos}> Téléphone: {user.phone} </p>
                    <p className={styles.infos}> Email: {user.email} </p>
                    <p className={styles.infos}> {user.invoices[userId].userAddress.number} {user.invoices[userId].userAddress.street} </p>
                    <p className={styles.infos}> {user.invoices[userId].userAddress.zipcode} {user.invoices[userId].userAddress.city}  </p>               
                    <p className={styles.span}> {user.invoices[userId].client} </p>                      
                    <p className={styles.infos}> Téléphone: {user.invoices[userId].clientPhone} </p>
                    <p className={styles.infos}> Email: {user.invoices[userId].clientEmail} </p>
                    <p className={styles.infos}> {user.invoices[userId].clientAddress.number} {user.invoices[userId].clientAddress.street} </p>
                    <p className={styles.infos}> {user.invoices[userId].clientAddress.zipcode} {user.invoices[userId].clientAddress.city}  </p>
                  </div>                       
                </div>
                <div className={styles.box_invoice}>
                  <p className={styles.invoiceP}> {user.invoices[userId].date} </p>
                  <p className={styles.invoiceP}> {user.invoices[userId].number} </p>
                  <p className={styles.invoiceP}> {user.invoices[userId].validity} </p>                  
                </div>
                <div className={styles.box_invoice}>
                  <p className={styles.invoice_value}> {user.invoices[userId].dateValue} </p>
                  <p className={styles.invoice_value}> {user.invoices[userId].numberValue} </p>
                  <p className={styles.invoice_value}> 30 jours </p>                  
                </div>
                {prestations &&
                <div className={styles.table}>
                  <div className={styles.tableHeader}> 
                    <p className={styles.prestation}> Prestation  </p>
                    <p className={styles.quantity}> Quantité  </p>
                    <p className={styles.prix}> Prix unitaire  </p>
                    <p className={styles.prixHT}> Prix HT  </p>
                    <p className={styles.tva}> T.V.A.( {user.tva}%)  </p>
                    <p className={styles.prixTTC} > Prix TTC  </p>
                  </div>                
                  {prestations.map((el, index) => (
                  <div 
                    key={index}
                    className={styles.service}
                  >  
                    <p className={styles.prestation}> {el.prestation} </p> 
                    <p div className={styles.quantity}> {el.quantity} </p> 
                    <p className={styles.prix} > {el.prix}€ </p> 
                    <p className={styles.prixHT} > {formatDecimal(el.prix * el.quantity)}€  </p> 
                    <p className={styles.tva} > {formatDecimal(((el.prix * el.quantity) * user.tva) / 100 )}€ </p>
                    <p className={styles.prixTTC} > {formatDecimal((((el.prix * el.quantity) * user.tva) / 100) + el.prix * el.quantity)}€  </p>                  
                  </div>                  
                  ))}
                  <div className={styles.tableHeader}> 
                    <p className={styles.prestation}>  Total </p>
                    <p className={styles.quantity}>  </p>
                    <p className={styles.prix}>   </p>
                    <p className={styles.prixHT}> Total HT  </p>
                    <p className={styles.tva}> T.V.A.( {user.tva}%)  </p>
                    <p className={styles.prixTTC} > Total TTC  </p>
                  </div>  
                  <div className={styles.service}>  
                    <p className={styles.prestation}>  </p> 
                    <p div className={styles.quantity}>  </p> 
                    <p className={styles.prix} >  </p> 
                    <p className={styles.prixHT}> {user.invoices[userId].totalHT} </p> 
                    <p className={styles.tva} > {user.invoices[userId].totalTVA}  </p>
                    <p className={styles.prixTTC} > {user.invoices[userId].totalTTC} </p>                   
                   </div>                                 
                </div> 
                }               
              </div>
            </div>
            <div className={styles.box_delete}>
              <button className={styles.btn } onClick={download}> Télécharger </button>
              <button className={styles.delete} onClick={() => handleDeleteInvoice(userId)}> Supprimer </button>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}