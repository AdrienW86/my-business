import React from 'react'
import Menu from '../../components/menu'
import Bills from '../../assets/devis.png'
import { user } from '../../data'

export default function factures() {
  return (
  <>
    <Menu 
        title = "Liste de vos devis"
        toggleText = "Créer un devis" 
        alt = "Icône d'un devis"
        icon = {Bills}   
        data = {user.factures}  
    />
  </>
  )
}