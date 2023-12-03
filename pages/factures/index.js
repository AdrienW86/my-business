import React from 'react'
import Menu from '../../components/menu'
import Bills from '../../assets/bills.png'
import { user } from '../../data'

export default function factures() {
  return (
  <>
    <Menu 
        title = "Liste de vos factures"
        toggleText = "Créer une facture" 
        alt = "Icône d'une facture"
        icon = {Bills}   
        data = {user.factures}  
    />
  </>
  )
}