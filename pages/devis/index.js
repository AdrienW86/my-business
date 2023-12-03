import { useState, useEffect } from 'react'
import Menu from '../../components/menu'
import Bills from '../../assets/devis.png'

export default function factures() {

  const [userProfil, setUserProfil] = useState([]); 

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token missing');
        return;
      }

      const response = await fetch('/api/profil', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('User data:', userData);
        setUserProfil(userData.quotes);
      } else {
        console.error('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  useEffect(() => { 
    fetchUserData();
    console.log(userProfil)
 }, []);

  return (
  <>
    <Menu 
        title = "Liste de vos devis"
        toggleText = "Créer un devis" 
        alt = "Icône d'un devis"
        icon = {Bills}   
        data = {userProfil}  
    />
  </>
  )
}