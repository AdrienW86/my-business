import React from 'react'
import CreateBills from '@/components/createBills'

export default function create() {

  return (
   <CreateBills 
        title="Facture"
        date="Date de facturation"
        number="Numéro de la facture"
        validity="Paiement"
        path= '/factures'
    />
  )
}
