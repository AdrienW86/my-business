import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Folder from '@/assets/folder.png'
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import styles from '../styles/CreateBills.module.css';
import { useRouter } from 'next/router'
import { useUser } from '@/utils/UserContext';

const CreateBills = (props) => {

  const { user, fetchUserData } = useUser();
  const [listClients, setListClients] = useState([]);
  
  const router = useRouter()
  const navigation = (path) => { 
    router.push(path)
}

  const [prestations, setPrestations] = useState([]);
  const [prestation, setPrestation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [prix, setPrix] = useState('');

  const [totalHT, setTotalHT] = useState(0);
  const [totalTTC, setTotalTTC] = useState(0);
  const [totalTVA, setTotalTVA] = useState(0);

  const [selectedClient, setSelectedClient] = useState(null);

  const SelectedClient = (el) => {
    setSelectedClient(el)
    Toggle()
  }


  useEffect(() => {  
    fetchUserData();
    console.log(selectedClient)
  }, [selectedClient]); 

useEffect(() => {
  if (user && user.clients) {
    const clientsNames = user.clients.map(client => client);
    setListClients(clientsNames);
    console.log(listClients)
  }
}, [user]);


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

  const generatePDF = () => {
    const maDate = new Date();
    const jour = maDate.getDate();
    const mois = maDate.getMonth() + 1;
    const annee = maDate.getFullYear();
    const dateFormatee = `${jour < 10 ? '0' : ''}${jour}/${mois < 10 ? '0' : ''}${mois}/${annee}`;

    const pdf = new jsPDF();
    const margin = 80;
        
    // Ajouter le titre
    pdf.setFontSize(32);
  
    pdf.setTextColor('#0060df')
    pdf.text(`${props.title}`, 15, 20);

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");

    pdf.text(`Vendeur: `, 15, 50);
    pdf.text(`${user.name}`, margin, 50);
    
    pdf.text(`Client: `, 15, 100);
    pdf.text(`${selectedClient.name}`, margin, 100)

    pdf.text(`${props.date}:`, 15, 150)
    pdf.text(`${props.number}:`, margin, 150);
    pdf.text(`${props.validity}`, 150, 150);

    pdf.setTextColor(0, 0, 0);
    
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    // Infos
    pdf.text(`Siret : ${user.siret}`, margin, 60)
    pdf.text(`Téléphone : ${user.phone}`, margin, 66)
    pdf.text(`Email : ${user.email}`, margin, 72)
    pdf.text(`${user.address.number} ${user.address.street}`, margin, 78)
    pdf.text(`${user.address.zipcode} ${user.address.city}`, margin, 84)
    pdf.text(`Téléphone : ${selectedClient.phone}`, margin, 110)
    pdf.text(`Email : ${selectedClient.email}`, margin, 116)
    pdf.text(`${selectedClient.address.number} ${selectedClient.address.street}`, margin, 122)
    pdf.text(`${selectedClient.address.zipcode} ${selectedClient.address.city}`, margin, 128)
    pdf.text(`${dateFormatee}`, 15, 155)
    pdf.text(`${user.invoices.length +1}`, margin, 155);
    pdf.text(`30 jours`, 150, 155);

    // Ajouter les prestations dans le tableau
    const tableData = [
      ['Prestation', 'Quantité', 'Prix unitaire','Prix HT', `T.V.A. (${user.tva}%)`, 'Prix TTC'],
      ...prestations.map(item => [
        item.prestation,
        item.quantity,
        item.prix,
        item.prixHT + '€',
        item.tva + '€',
        item.totalTTC + '€',
      ]),
    ];

    const totalTitle = ['Total', 'Total HT',  `T.V.A. (${user.tva}%)`, 'Total TTC'];
    const total = ['', totalHT.toFixed(2) + '€',  totalTVA.toFixed(2) + '€', totalTTC.toFixed(2) + '€'];

    pdf.autoTable({
      startY: 165,
      head: [tableData[0]],
      body: tableData.slice(1),
      theme: 'striped',
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 20 }, 2: { cellWidth: 25 }, 3: { cellWidth: 25 }, 4: { cellWidth: 30 }, 5: { cellWidth: 22 } },
    });

    pdf.autoTable({    
      startY: pdf.lastAutoTable.finalY + 5 ,
      head: [totalTitle],
      body: [total],
      theme: 'striped',
      columnStyles: { 0: { cellWidth: 105 }, 1: { cellWidth: 25 }, 2: { cellWidth: 30 }, 3: { cellWidth: 22 }},
    });
    pdf.save('facture.pdf');
  };

  return (
    <>
    <section className={styles.form}>    
      <h1 className={styles.title}> {props.title}</h1>  
      <button 
        onClick={() => navigation(props.path)}
        className={styles.btn_return}> Retour
      </button>
      <h2 className={styles.h2}>Informations du client</h2>
        <div className={styles.selectedClient}> Client sélectionné :
          {selectedClient ?  <span className={styles.span_client}> {selectedClient.name} </span> : <span className={styles.span_client}> à définir </span>} 
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
            selectedClient === el ? styles.selectedClient : ''
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
{selectedClient ?
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