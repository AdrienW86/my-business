import React from 'react'
import Header from '../components/header'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Image from 'next/image'
import Logo from '../assets/user.png'

import styles from '../styles/Profil.module.css'



import { useState, useEffect } from 'react'

export default function Profil() {
    const [userProfil, setUserProfil] = useState({}); // Initialisez avec un objet vide
  
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
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };


    useEffect(() => {
       
    
        fetchUserData();
      }, []); // Utilisez une dépendance vide pour que cela s'exécute une seule fois lors du montage initial
    
    
 
  
  return (
  <>
    <Header />  
        <main className={styles.main} >
          <Nav /> 
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
                    <section className={styles.body}>
                        <p className={styles.p_infos}> SIRET : <span className={styles.span_infos}> {userProfil.siret} </span></p>
                        <p className={styles.p_infos}> TVA : <span className={styles.span_infos}>{userProfil.tva}% </span></p>
                        <p className={styles.p_infos}> ADRESSE : <span className={styles.span_infos}> </span> </p>
                        <p className={styles.p_infos}> VILLE : <span className={styles.span_infos}> </span> </p>
                        <p className={styles.p_infos}> TELEPHONE : <span className={styles.span_infos}> {userProfil.phone} </span> </p>
                        <p className={styles.p_infos}> EMAIL : <span className={styles.span_infos}> {userProfil.email} </span> </p>
                    </section>
                    <section className={styles.box}>
                        <button className={styles.params}> Paramètres</button>
                    </section>             
                </div>)
            }
        </main>
    <Footer />
  </>
  )
}