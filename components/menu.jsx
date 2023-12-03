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
        console.log(currentUrl)
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
                            navigateToClientDetails(index); // Remplacez 'id' par la propriété appropriée de votre client
                          }}
                            className={styles.row} 
                            key = {index}
                            > 
                            <Image
                                src={props.icon}
                                width={35}
                                height={35}
                                priority
                                className={styles.icons}
                                alt={props.alt}
                            /> 
                            <p className={styles.p}> {el.name} </p>               
                        </div>
                    ))}          
            </section>           
        </main>
    <Footer />
   </>
  )
}
