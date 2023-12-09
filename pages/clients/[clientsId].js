import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Nav from '@/components/nav';
import ButtonReturn from '@/components/buttonReturn';
import Footer from '@/components/footer';
import { useRouter } from 'next/router';
import styles from './Client.module.css';
import { useUser } from '@/utils/UserContext';
import UpdateClientForm from '@/components/updateClient';

export default function ClientsId() {
  const { user, fetchUserData } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const clientId = parseInt(id);

  const [toggle, setToggle] = useState(false);
  console.log(clientId)
  

  const updateClient = async (clientId, formData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/update-client?clientId=${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // Utilisez les données du formulaire ici
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          // ... autres champs
          address: {
            number: formData.address.number,
            street: formData.address.street,
            city: formData.address.city,
            zipcode: formData.address.zipcode,
            country: formData.address.country,
          },
        }),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        console.log('Client mis à jour:', updatedData.updatedClient);
        // Vous pouvez également mettre à jour l'état local du client avec les nouvelles données
      } else {
        console.error('Error updating client:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating client:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserData(); // Assurez-vous que les données de l'utilisateur sont chargées
        
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        alert("Erreur lors du chargement des données du client");
      }
    }; 
    fetchData(); // Appelez la fonction fetchData
  }, []);

  const deleteClient = async (clientId) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer ${user.clients[clientId].name} ?` );        
    if (confirmDelete) {
      const token = localStorage.getItem('token');
        try { 
          const response = await fetch(`/api/delete-client?clientId=${clientId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            router.push('/clients')
          } else {
            console.error('Error deleting client:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting client:', error.message);
        }
    }
  };
  
  const Toggle = () => {
    setToggle(!toggle);
  };

  const showInvoice = (id) => {
    router.push(`/factures/[factureId]?id=+${id}`);
  };

  const showDevis = (id) => {
    router.push(`/devis/[devis]?id=+${id}`);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <ButtonReturn url='/clients' />
        <Nav />
        {user && (
          <section className={styles.container}>
            <div className={styles.card}>
              <div className={styles.item}>
                <h1 className={styles.title}> {user.clients[clientId].name} </h1>
                <div className={styles.body_card}>
                  <div>
                    <p>
                      <span className={styles.span}>Téléphone : </span> {user.clients[clientId].phone}
                    </p>
                    <p>
                      <span className={styles.span}>Email : </span> {user.clients[clientId].email}
                    </p>
                  </div>
                  {user.clients[clientId].address && (
                    <div>
                      <p>
                        <span className={styles.span}>Adresse : </span>{' '}
                        {user.clients[clientId].address.number} {user.clients[clientId].address.street}
                      </p>
                      <p>
                        <span className={styles.span}>Ville : </span>{' '}
                        {user.clients[clientId].address.zipcode} {user.clients[clientId].address.city}{' '}
                        {user.clients[clientId].address.country}
                      </p>
                    </div>
                  )}
                  <p className={styles.dash}></p>
                  <div className={styles.box}>
                    <button  className={styles.btn}>
                      Voir factures
                    </button>
                    <button  className={styles.btn}>
                      Voir devis
                    </button>
                  </div>                
                  <div className={styles.box_delete}>
                    <button className={styles.update} onClick={Toggle}>Mettre à jour</button>  
                    <button className={styles.delete} onClick={() =>deleteClient(clientId)}> Supprimer </button>                                  
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>    
      {toggle &&
        <UpdateClientForm clientId ={clientId} updateClient={updateClient} />
      }
      <Footer />
    </>
  );
}
