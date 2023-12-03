import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import styles from '@/styles/UpdateProfil.module.css'

const UpdateForm = ({ onSubmit, toggle }) => {

  const router = useRouter()

  const { register, handleSubmit, setValue, reset } = useForm({
    // Vous pouvez configurer des options globales ici
  });

  const handleChange = (e) => {
    setValue(e.target.name, e.target.value);
  };

  const submitHandler = (data) => {
    onSubmit(data);
    reset()
    alert('Vous modifications ont bien été enregistrées')
    window.location.reload();
  };

  return (
   <section className={styles.container}>
        <button className={styles.btnClose} onClick={toggle}> X </button>
         <form 
            className={styles.form}
            onSubmit={handleSubmit(submitHandler)}
         >
          <h1 className={styles.title}> Vos Pamamètres </h1>
            <label className={styles.input}>NOM:</label>
            <input className={styles.input} {...register('name', { required: true })} onChange={handleChange} /> 

            <label className={styles.input}>SIRET:</label>
            <input className={styles.input}{...register('siret', { required: true })} onChange={handleChange} />

            <label className={styles.input}>TVA:</label>
            <input className={styles.input}{...register('tva', { required: true })} onChange={handleChange} />

            <label className={styles.input}>TELEPHONE:</label>
            <input className={styles.input}{...register('phone', { required: true })} onChange={handleChange} />

            <label className={styles.input}>EMAIL:</label>
            <input className={styles.input}{...register('email', { required: true })} onChange={handleChange} />

            <div className={styles.adress}>
                <label className={styles.input} >ADRESSE:</label>
            <div className={styles.div}>
        
            <input className={styles.number}{...register('address.number', { required: true })} placeholder="Numéro" onChange={handleChange} />
            <input className={styles.streetName} {...register('address.street', { required: true })} placeholder="Nom de la voie" onChange={handleChange} /> 
      
            </div>   
                <input className={styles.inputAdress}{...register('address.city', { required: true })} placeholder="Ville" onChange={handleChange} />
                <input className={styles.inputAdress}{...register('address.zipcode', { required: true })} placeholder="Code postal" onChange={handleChange} />
                <input className={styles.inputAdress}{...register('address.country', { required: true })} placeholder="Pays" onChange={handleChange} />     
            </div>
            <button className={styles.submit} type="submit">Mettre à jour</button>
        </form>
   </section>
  );
};

export default UpdateForm;

