import { useEffect } from 'react'
import Menu from '../../components/menu'
import Bills from '../../assets/bills.png'
import { useUser } from '@/utils/UserContext';

export default function factures() {

  const { user, fetchUserData } = useUser();

    useEffect(() => { 
      fetchUserData(); 
   }, []);
    
  return (
  <>
  {user ?
    <Menu 
        title = "Liste de vos factures"
        toggleText = "Créer une facture" 
        alt = "Icône d'une facture"
        icon = {Bills}   
        data = {user.invoices}  
    />
    : <div> Chargement...</div>
  }
  </>
  )
}