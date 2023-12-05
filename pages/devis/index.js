import { useEffect } from 'react'
import Menu from '../../components/menu'
import Bills from '../../assets/devis.png'
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
        title = "Liste de vos devis"
        toggleText = "Créer un devis" 
        alt = "Icône d'un devis"
        icon = {Bills}   
        data = {user.quotes}  
    />
    : <div> Chargement...</div>
  }
  </>
  )
}