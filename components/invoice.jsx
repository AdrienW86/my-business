import React, { useEffect, useState } from 'react';
import { generatePdf }  from '@/utils/generatePdf';
import { useRouter } from 'next/router';
import styles from '@/pages/factures/Facture.module.css';

export default function Invoice(props) {

  const invoice = props.user.clients[props.clientId].invoices[props.invoiceId]
  const handleDeleteInvoice = async (clientId, invoiceId) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer ce devis ?` );        
    if (confirmDelete) {
      const token = localStorage.getItem('token');
      try { 
        const response = await fetch(`/api/delete-client-invoice?clientId=${clientId}&invoiceId=${invoiceId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
         window.location.reload()
        } else {
          console.error('Error deleting quote:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting quote:', error.message);
      }
    }
  }

  const download = () => {
    generatePdf(invoice)
  }
 
  return (
    <section>   
      <section className={styles.container}>
        <button className={styles.btnClose} onClick={props.toggle} > X </button>
        <div className={styles.card}>
            <div className={styles.item}>
             <h1 className={styles.title}> {invoice.title} </h1>
              <div className={styles.body_card}>
                <div className={styles.label}>
                  <p className={styles.h3}> Vendeur:</p>
                  <p className={styles.h4}> Client:</p> 
                </div>
                <div className={styles.boxInfos}>
                  <p className={styles.span}> {invoice.user} </p>
                  <p className={styles.infos}> Siret: {invoice.siret} </p>
                  <p className={styles.infos}> Téléphone: {invoice.userPhone} </p>
                  <p className={styles.infos}> Email: {invoice.userEmail} </p>
                  <p className={styles.infos}> {invoice.userAddress.number} {invoice.userAddress.street} </p>
                  <p className={styles.infos}> {invoice.userAddress.zipcode} {invoice.userAddress.city} </p>               
                  <p className={styles.span}> {invoice.client} </p>                      
                  <p className={styles.infos}> Téléphone: {invoice.userPhone} </p>
                  <p className={styles.infos}> Email: {invoice.userEmail} </p>
                  <p className={styles.infos}> {invoice.clientAddress.number} {invoice.clientAddress.street}</p>
                  <p className={styles.infos}> {invoice.clientAddress.zipcode} {invoice.clientAddress.city}  </p>
                </div>                       
              </div>
              <div className={styles.box_invoice}>
                <p className={styles.invoiceP}> {invoice.date} </p>
                <p className={styles.invoiceP}> {invoice.number}  </p>
                <p className={styles.invoiceP}> {invoice.validity} </p>                  
              </div>
              <div className={styles.box_invoice}>
                <p className={styles.invoice_value}> {invoice.dateValue} </p>
                <p className={styles.invoice_value}> {invoice.numberValue} </p>
                <p className={styles.invoice_value}> 30 jours </p>                  
              </div>
              {invoice.services &&
                <div className={styles.table}>
                  <div className={styles.tableHeader}> 
                    <p className={styles.prestation}> Prestation  </p>
                    <p className={styles.quantity}> Quantité  </p>
                    <p className={styles.prix}> Prix unitaire  </p>
                    <p className={styles.prixHT}> Prix HT  </p>
                    <p className={styles.tva}> T.V.A.( {invoice.tva}%)  </p>
                    <p className={styles.prixTTC} > Prix TTC  </p>
                  </div>                 
                   {invoice.services.map((el, index) => (
                  <div 
                    key={index}
                    className={styles.service}
                  >  
                    <p className={styles.prestation}> {el.prestation} </p> 
                    <p div className={styles.quantity}> {el.quantity} </p> 
                    <p className={styles.prix}> {el.prix}€ </p> 
                    <p className={styles.prixHT}> {el.prixHT} €  </p> 
                    <p className={styles.tva}> {el.tva}€ </p>
                    <p className={styles.prixTTC} > {el.totalTTC}€  </p>                  
                  </div>                  
                  ))} 
                  <div className={styles.tableHeader}> 
                    <p className={styles.prestation}>  Total </p>
                    <p className={styles.quantity}>  </p>
                    <p className={styles.prix}>   </p>
                    <p className={styles.prixHT}> Total HT  </p>
                    <p className={styles.tva}> T.V.A.({invoice.tva}%)  </p>
                    <p className={styles.prixTTC} > Total TTC  </p>
                  </div>  
                  <div className={styles.service}>  
                    <p className={styles.prestation}>  </p> 
                    <p div className={styles.quantity}>  </p> 
                    <p className={styles.prix}> </p> 
                    <p className={styles.prixHT}> {invoice.totalHT} </p> 
                    <p className={styles.tva}> {invoice.totalTVA}  </p>
                    <p className={styles.prixTTC}> {invoice.totalTTC} </p>                   
                   </div>                                 
                </div> 
              }        
            </div>
          </div>
          <div className={styles.box_delete}>
            <button className={styles.btn } onClick={download}> Télécharger </button>
            <button className={styles.delete} onClick={() => handleDeleteInvoice(props.clientId, props.invoiceId)}> Supprimer </button>
          </div>
      </section>    
    </section>
  );
}