import { useEffect } from 'react'
import Menu from '../../components/clientsList'
import Folder from '../../assets/folder.png'
import { useUser } from '@/utils/UserContext';

export default function clients() { 

  const { user, fetchUserData } = useUser();

  useEffect(() => { 
    fetchUserData();
  }, []);

  return (
  <>
  {user ?
    <Menu 
      title = "Liste de vos clients"
      toggleText = "Ajouter un client" 
      alt = "Icône d'un dossier"
      icon = {Folder}   
      data = {user.clients} 
    />
    : <div> Chargement...</div>
  }
  </>
  )
}