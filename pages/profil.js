import { useState, useEffect } from 'react'
import Header from '../components/header'
import Nav from '../components/nav'
import UpdateForm from '@/components/updateProfil'
import Footer from '../components/footer'
import Image from 'next/image'
import Logo from '../assets/user.png'
import styles from '../styles/Profil.module.css'

export default function Profil() {
    const [userProfil, setUserProfil] = useState({}); 
    const [userAdress, setUserAdress] = useState({})
    const [toggle, setToggle] = useState(false)

    
  
    const Toggle = () => {
      setToggle(!toggle)
    }
    
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
          setUserProfil(userData);
          setUserAdress(userData.address)

        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    const handleUpdate = async (updatedData) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updatedData),
        });
  
        if (response.ok) {
          // Mettez à jour l'état local avec les nouvelles données
          setUserProfil(updatedData);
          console.log('Profil mis à jour avec succès!');
        } else {
          console.error('Erreur lors de la mise à jour du profil:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error.message);
      }
    };
  
    useEffect(() => { 
      fetchUserData();
   }, []);
    
    // Utilisez une dépendance vide pour que cela s'exécute une seule fois lors du montage initial
    
  return (
  <>
    <Header />  
        <main className={styles.main} >
          <Nav /> 
          {toggle &&
            <UpdateForm onSubmit={handleUpdate} toggle={Toggle} />
          }
          {userProfil && (
                <div className={styles.container}>
                    <section className={styles.header}>
                        <div className={styles.logo}>
                            <Image 
                                src={Logo}
                                height={100}
                                width={100}
                                alt='logo'
                            />
                        </div>
                        <div className={styles.infos}>
                            <h1 className={styles.name}>{userProfil.name} </h1>
                                <div className={styles.status}>
                                    <p className={styles.profit}> Chiffre d'affaire : <span style={{color: "green", marginLeft: "2px"}}> {userProfil.profit} € </span></p>
                                    <p className={styles.expenses}> Dépenses : <span style={{color: "red", marginLeft: "2px"}}> {userProfil.expenses} € </span> </p>
                                </div>                                      
                        </div>              
                    </section>
                    {userAdress &&
                      <section className={styles.body}>
                          <p className={styles.p_infos}> SIRET : <span className={styles.span_infos}> {userProfil.siret} </span></p>
                          <p className={styles.p_infos}> TVA : <span className={styles.span_infos}>{userProfil.tva}% </span></p>
                          <p className={styles.p_infos}> ADRESSE : <span className={styles.span_infos}> {userAdress.number}{userAdress.street} </span> </p>
                          <p className={styles.p_infos}> VILLE : <span className={styles.span_infos}>  {userAdress.zipcode} {userAdress.city} </span> </p>
                          <p className={styles.p_infos}> TELEPHONE : <span className={styles.span_infos}> {userProfil.phone} </span> </p>
                          <p className={styles.p_infos}> EMAIL : <span className={styles.span_infos}> {userProfil.email} </span> </p>
                      </section>
                    }
                    <section className={styles.box}>
                        <button className={styles.params} onClick={Toggle}> Paramètres</button>
                    </section>             
                </div>)
            }
        </main>
    <Footer />
  </>
  )
}