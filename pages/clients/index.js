import React from 'react'
import Menu from '../../components/menu'
import Folder from '../../assets/folder.png'
import { user } from '../../data'

export default function clients() { 
  return (
  <>
    <Menu 
        title = "Liste de vos clients"
        toggleText = "Ajouter un client" 
        alt = "Icône d'un dossier"
        icon = {Folder}   
        data = {user.clients} 
    />
  </>
  )
}