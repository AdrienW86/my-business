import React from 'react'
import CreateBills from '@/components/createBills'

export default function create() {

  return (
   <CreateBills 
        title="Devis"
        date="Date d'édition"
        number="Numéro du devis"
        validity="Validité"
        path= '/devis'
    />
  )
}
