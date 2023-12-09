import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import Nav from '../components/nav'
import { useRouter } from 'next/router'
import Footer from '../components/footer'
import Image from 'next/image'
import styles from '../styles/Clients.module.css'

export default function Menu(props) {

    const router = useRouter()
    const currentUrl = router.asPath

    const [url, setUrl ] = useState()
    const [ path, setPath ] = useState()
    const [selectedClient, setSelectedClient] = useState(null);

    const navigateToClientDetails = (id) => {
        router.push(`${path}+${id}`);
      };

    const navigation = (route) => { 
        router.push(route)
    }

    useEffect(() => {
        if (currentUrl === "/factures") {
           setUrl('/factures/create')
           setPath('/factures/[factureId]?id=')
        } else if (currentUrl === "/devis") {
            setUrl('/devis/create')
            setPath('/devis/[deviId]?id=')
        } else if (currentUrl === "/clients") {
            setUrl('/clients/create')
            setPath('/clients/[clientId]?id=')
        }
    }, [currentUrl]);

  return (
   <>
     <Header />  
        <main className={styles.main} >
          <Nav />            
            <h2 className={styles.title}> {props.title} </h2>
            <section className={styles.btn_container}>
            <button className={styles.btn_add} onClick={() => navigation(url)}>  + {props.toggleText} </button>
            </section>
            <section className={styles.container}>               
              {props.data.map((el, index) =>( 
                <div 
                  onClick={() => {
                    setSelectedClient(index);
                    navigateToClientDetails(index);
                  }}
                  className={styles.row} 
                  key = {index}
                > 
                  <div className={styles.header}>
                    <Image
                      src={props.icon}
                      width={35}
                      height={35}
                      priority
                      className={styles.icons}
                      alt={props.alt}
                    /> 
                    <p className={styles.name}> {el.name} </p>  
                  </div>
                  <div>
                    <p className={styles.p}> Factures: {el.invoices.length} </p> 
                    <p className={styles.date}> {el.dateValue} </p>
                    <p className={styles.p}> Devis: {el.quotes.length} </p>
                    <p className={styles.price}> {el.totalTTC} </p>
                  <div className={styles.box}>
                    <button className={styles.btn}> Voir </button>
                  </div>
                   
                  </div>                 
                </div>
               
              ))}          
            </section>           
        </main>
    <Footer />
   </>
  )
}