import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Folder from '@/assets/folder.png'
import styles from '../styles/CreateBills.module.css';
import { useRouter } from 'next/router'
import { useUser } from '@/utils/UserContext';
import { generatePdf }  from '@/utils/generatePdf';

const CreateBills = (props) => {

  const { user, fetchUserData } = useUser();
  const [ listClients, setListClients] = useState([]);
  const [ url, setUrl ] = useState()
  
  const router = useRouter()
  const currentUrl = router.pathname

  const navigation = () => { 
    router.push(props.path)
  }

  const [prestations, setPrestations] = useState([]);
  const [prestation, setPrestation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [prix, setPrix] = useState('');

  const [totalHT, setTotalHT] = useState(0);
  const [totalTTC, setTotalTTC] = useState(0);
  const [totalTVA, setTotalTVA] = useState(0);

  const [client, setclient] = useState(null);

  const SelectedClient = (el) => {
    setclient(el)
    Toggle()
  }

  useEffect(() => {     
    fetchUserData();
  }, [client]); 

useEffect(() => {
  if (user && user.clients) {
    const clientsNames = user.clients.map(client => client);   
    setListClients(clientsNames);  
    if(currentUrl === '/factures/create') {
      setUrl(user.invoices.length )
    }else if(currentUrl === '/devis/create'){
      setUrl(user.quotes.length )
    }
  }
}, [user, url]);

const [toggle, setToggle] = useState(false)

const Toggle = () => {
  setToggle(!toggle)
}

const addClient = () => {
  router.push('/clients/create')
}
  const addPrestation = () => {
    if (prestation && prix && quantity) {
      const prixHT = parseFloat(prix * quantity).toFixed(2);
      const tva = parseFloat((prixHT * user.tva) / 100).toFixed(2);
      const totalTTC = (parseFloat(prixHT) + parseFloat(tva)).toFixed(2);

      setPrestations([...prestations, { prestation, quantity, prix, prixHT, tva, totalTTC }]);
      console.log(prestations)
      setPrestation('');
      setQuantity('');
      setPrix('');
      setTotalHT(prevTotalHT => prevTotalHT + parseFloat(prixHT));
      setTotalTTC(prevTotalTTC => prevTotalTTC + parseFloat(totalTTC));
      setTotalTVA(prevTotalTVA => prevTotalTVA + parseFloat(tva));  
    }
  };

  const removePrestation = (index) => {
    const updatedPrestations = [...prestations];
    updatedPrestations.splice(index, 1);
    setPrestations(updatedPrestations);
  };

  const calculateTVATotal = () => {
    return prestations.reduce((sum, item) => sum + parseFloat(item.tva), 0).toFixed(2);
  };

  const calculateTotal = () => {
    return prestations.reduce((sum, item) => sum + parseFloat(item.totalTTC), 0).toFixed(2);
  };

  const calculateWithoutTVA =() => {
    return prestations.reduce((sum, item) => sum + parseFloat(item.totalTTC - item.tva), 0).toFixed(2);
  }

  const savePDFToDatabase = async (bills) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/save-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bills),    
      });

      if (!response.ok) {
        throw new Error('Échec de la requête pour enregistrer le PDF dans la base de données.');
      }

      const responseData = await response.json();
     
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du PDF dans la base de données :', error);
    }
  };

    const maDate = new Date();
    const jour = maDate.getDate();
    const mois = maDate.getMonth() + 1;
    const annee = maDate.getFullYear();
    const dateFormatee = `${jour < 10 ? '0' : ''}${jour}/${mois < 10 ? '0' : ''}${mois}/${annee}`;
    const total = ['', totalHT.toFixed(2) + '€',  totalTVA.toFixed(2) + '€', totalTTC.toFixed(2) + '€'];
  
    const generatePDF = () => {
      const bills = {
        index: url,
        title: props.title,
        tva: user.tva,
        user: user.name,
        siret: user.siret,
        userPhone: user.phone,
        userEmail: user.email,
        userAddress: user.address,
        indexClient: client.index,
        client: client.name,
        clientPhone: client.phone,
        clientEmail: client.email,
        clientAddress: client.address,
        services: prestations,
        date: props.date,
        dateValue : dateFormatee,    
        validity: props.validity,  
        number: props.number,
        numberValue: user.invoices.length + 1,
        totalHT: total[1],
        totalTVA: total[2],
        totalTTC: total[3], 
      }
      generatePdf(bills)    
      savePDFToDatabase(bills)  
      alert("Votre document a bien été enregistré") 
      navigation()
    }

  return (
    <>
    <section className={styles.form}>    
      <h1 className={styles.title}> {props.title}</h1>  
      <button 
        onClick={navigation}
        className={styles.btn_return}> Retour
      </button>
      <h2 className={styles.h2}>Informations du client</h2>
        <div className={styles.selectedClient}> Client sélectionné :
          {client ?  <span className={styles.span_client}> {client.name} </span> : <span className={styles.span_client}> à définir </span>} 
          </div>
        <div className={styles.box}>
       
          <button className={styles.toggleBtn} onClick={addClient}> Créer un client </button>
          <button onClick={Toggle} className={styles.toggleBtn} > Ajouter client enregistré  </button> 
          {toggle && (
  <section className={styles.listClients}>
    <div className={styles.toggleBtnCloseBox}>
      <button onClick={Toggle} className={styles.toggleBtnClose}>
        Fermer
      </button>
    </div>
    <h3 className={styles.modal_title}>Vos clients enregistrés</h3>
    <div className={styles.modal_container}>
      {listClients.map((el, index) => (
        <div
          onClick={() => SelectedClient(el)}
          className={`${styles.rowModal} ${
            client === el ? styles.selectedClient : ''
          }`}
          key={index}
        >
          <Image
            src={Folder}
            width={35}
            height={35}
            priority
            className={styles.icons}
            alt={props.alt}
          />
          <p className={styles.p}>{el.name}</p>
        </div>
      ))}
    </div>
  </section>
)}
  </div>
{client ?
  <section>
  <div className={styles.container}>    
        <div className={styles.services}>
          <div className={styles.row}>
            <label className={styles.label}>Prestation:</label>
            <input className={styles.input} type="text" value={prestation} onChange={(e) => setPrestation(e.target.value)} />
          </div>       
          <div className={styles.row}>
            <label className={styles.label}>Quantité:</label>
            <input className={styles.input} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
        <div className={styles.row}>
          <label className={styles.label}>Prix:</label>
          <input className={styles.input} type="number" value={prix} onChange={(e) => setPrix(e.target.value)} />
        </div>
        <div className={styles.row}>
          <button  className={styles.btn_add} onClick={addPrestation}>Ajouter</button> 
        </div>      
        </div>
      </div>
      <div className={styles.table}> 
      <table className={styles.tab} border="1">
        <thead>
          <tr>
            <th className={styles.th}>Prestation</th>
            <th className={styles.th}>Quantité</th>
            <th className={styles.th}>Prix</th>
            <th className={styles.th}>Total</th>
          </tr>
        </thead>
        <tbody>
          {prestations.map((item, index) => (
            <tr key={index}>
              <td className={styles.td}>{item.prestation}</td>
              <td className={styles.td}>{item.quantity}</td>
              <td className={styles.td}>{item.prix}€</td>
              <td className={styles.td}>{item.prix * item.quantity}€</td>            
                <button className={styles.delete} onClick={() => removePrestation(index)}>X</button>            
            </tr>
          ))}
          <tr>
            <td className={styles.tr} colSpan="2"> Total HT : {calculateWithoutTVA()} € </td>
            <td className={styles.tr}> Total T.V.A : {calculateTVATotal()}€ </td>
            <td className={styles.tr}>Total: {calculateTotal()}€</td>
          </tr>
        </tbody>
      </table>
      </div> 
      <div className={styles.btn_generate_box}> 
        <button className={styles.generate} onClick={generatePDF}>Générer PDF</button>
      </div>  

  </section> : 
  <section className={styles.warning}>
    <h2 className={styles.warningTitle}> Veuillez définir un client avant de poursuivre</h2>
    <h3 className={styles.pTitle}> Création d'un client</h3> 
    <div className={styles.warning_div}> 
      <p className={styles.pw} > Vous pouvez créer simplement un client en appuyer sur le bouton <span className={styles.warningSpan}>"Créer un client"</span>
      ci-dessus. Vous retrouverez l'ensemble de vos clients dans l'onglet "Vos clients"</p>
    </div>

    <h3 className={styles.pTitle}> Ajout d'un client à votre facture</h3>
    <div className={styles.warning_div} >
      <p className={styles.pw}> Lorsque vous avez déjà enregistré un client, il vous suffit de cliquer sur le bouton
      <span className={styles.warningSpan}> "Ajouter client enregistré" </span> pour afficher la liste de vos clients et faire
       votre choix.Les informations du client seront automatiquement
      transmises sur votre facture ou votre devis.</p>
    </div>
  </section> }
    
    
    </section>
   </>
  );
};
export default CreateBills;