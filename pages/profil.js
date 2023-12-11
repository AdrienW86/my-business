import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/header'
import Nav from '../components/nav'
import UpdateForm from '@/components/updateProfil'
import Footer from '../components/footer'
import Image from 'next/image'
import Logo from '../assets/user.png'
import styles from '../styles/Profil.module.css'

import { useUser } from '@/utils/UserContext';

export default function Profil() {

  const router = useRouter()
  const { user, userAddress, updateUser, fetchUserData } = useUser();

    const [toggle, setToggle] = useState(false)
  
    const Toggle = () => {
      setToggle(!toggle)
    }

    const siret = user && user.siret;
    console.log(siret);
    

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
          updateUser(updatedData);
          console.log('Profil mis à jour avec succès!');
        } else {
          console.error('Erreur lors de la mise à jour du profil:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error.message);
      }
    };

    const handleDelete = async () => {
      const confirmDelete = window.confirm("Voulez-vous vraiment supprimer votre compte ?");
    
      if (confirmDelete) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('/api/delete', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
    
          if (response.ok) {
            console.log('Profil supprimé avec succès!');
            localStorage.clear()
            router.push('/')
          } else {
            console.error('Erreur lors de la suppression du profil:', response.statusText);
          }
        } catch (error) {
          console.error('Erreur lors de la suppression du profil:', error.message);
        }
      }
    };
    
    useEffect(() => {     
      fetchUserData();
    },[siret]);
     
  return (
  <>
    <Header />  
      <main className={styles.main} >
        <Nav /> 
          {siret == 0 ? 
            <section className={styles.warning}> 
              <p className={styles.titleWarning}> Pour pouvoir générer rapidement vos documents </p>
              <p className={styles.pWarning}> Veuillez compléter votre profil avant de continuer </p>
            </section> : null
          }
          {toggle &&
            <UpdateForm onSubmit={handleUpdate} onDelete ={() => handleDelete(user)}/>
          }
          {user && (
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
                  <h1 className={styles.name}>{user.name} </h1>
                    {/* <div className={styles.status}>
                      <p className={styles.profit}> Chiffre d'affaire : <span style={{color: "green", marginLeft: "2px"}}> {user.profit} € </span></p>
                      <p className={styles.expenses}> Dépenses : <span style={{color: "red", marginLeft: "2px"}}> {user.expenses} € </span> </p>
                    </div>                                       */}
                </div>              
              </section>
              {userAddress &&
                <section className={styles.body}>
                  <p className={styles.p_infos}> SIRET : <span className={styles.span_infos}> {user.siret} </span></p>
                  <p className={styles.p_infos}> TVA : <span className={styles.span_infos}>{user.tva}% </span></p>
                  <p className={styles.p_infos}> ADRESSE : <span className={styles.span_infos}> {userAddress.number}{userAddress.street} </span> </p>
                  <p className={styles.p_infos}> VILLE : <span className={styles.span_infos}>  {userAddress.zipcode} {userAddress.city} </span> </p>
                  <p className={styles.p_infos}> TELEPHONE : <span className={styles.span_infos}> {user.phone} </span> </p>
                  <p className={styles.p_infos}> EMAIL : <span className={styles.span_infos}> {user.email} </span> </p>
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