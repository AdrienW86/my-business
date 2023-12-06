import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '@/styles/UpdateProfil.module.css'

const UpdateForm = ({ onSubmit }) => {

  const navigation = () => {
    window.location.reload()
  }

  const { register, handleSubmit, setValue, reset,  formState: { errors } } = useForm()
    // Vous pouvez configurer des options globales ici);

  const handleChange = (e) => {
    setValue(e.target.name, e.target.value);
  };

  const submitHandler = (data) => {
    console.log(data)
    onSubmit(data);
    alert('Vous modifications ont bien été enregistrées')
    navigation()
  };

  return (
   <section className={styles.container}>
        <button onClick={navigation} className={styles.btnClose} > X </button>
         <form 
            className={styles.form}
            onSubmit={handleSubmit(submitHandler)}
         >
          <h1 className={styles.title}> Vos Pamamètres </h1>
          <div className={styles.adress}>
            <label className={styles.label}>NOM:</label>
            <input className={styles.input} 
              {...register('name', {
                  required: 'Le nom est requis',
                   pattern: /^[A-Za-z]+$/i,
              })} 
              placeholder="Nom de votre entreprise" onChange={handleChange} 
            /> 
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            <label className={styles.label}>SIRET:</label>
            <input className={styles.input} 
             {...register('siret', {
                required: 'Le SIRET est requis',
                pattern: /^\d{14}$/,
              })} 
              placeholder="Votre SIRET" onChange={handleChange}
            />
             {errors.siret && <p className={styles.error}>{errors.siret.message}</p>}
            <label className={styles.label}>TVA:</label>
            <input className={styles.input} 
              {...register('tva', {
                required: 'La TVA est requise',
                pattern: /^[A-Za-z0-9]+$/i,
              })} 
              placeholder="Votre T.V.A" onChange={handleChange} 
            />
            {errors.tva && <p className={styles.error}>{errors.tva.message}</p>}
            <label className={styles.label}>TELEPHONE:</label>
            <input className={styles.input}
              {...register('phone', {
                required: 'Le numéro de téléphone est requis',
                pattern: /^\d{10,16}$/,
            })} 
            placeholder="Votre téléphone" onChange={handleChange} 
          />
          {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
          </div>
            <div className={styles.adress}>
                <label className={styles.label} >ADRESSE:</label>
               <div className={styles.div}>
        
            <input className={styles.number} 
              {...register('address.number', {
                required: 'numéro',
                pattern: /^\d+$/,
              })} 
              placeholder="Numéro" onChange={handleChange} 
            />
            
            <input className={styles.streetName} 
               {...register('address.street', {
                required: 'nom de la voie',
                pattern: /^[A-Za-z0-9\s]+$/i,
              })} placeholder="Nom de la voie" onChange={handleChange} 
            /> 
            
            </div>
            <div className={styles.div_error}>
            {errors.address?.number && (
  <p className={styles.error_number}>{errors.address.number.message}</p>
)}
              {errors.address?.street && (
              <p className={styles.error_street}>{errors.address.street.message}</p>
            )}
            </div>  
            
                <input className={styles.inputAdress}
                  {...register('address.city', {
                    required: 'La ville est requise',
                    pattern: /^[A-Za-z\s]+$/i,
                  })} 
                  placeholder="Ville" onChange={handleChange} 
                />
                {errors.address?.city && <p className={styles.error}>{errors.address.city.message}</p>}
                <input className={styles.inputAdress}
                  {...register('address.zipcode', {
                    required: 'Le code postal est requis',
                    pattern: /^\d{5}$/,
                  })} 
                placeholder="Code postal" onChange={handleChange} 
              />
              {errors.address?.zipcode && <p className={styles.error}>{errors.address.zipcode.message}</p>}
                <input className={styles.inputAdress}
                  {...register('address.country', {
                    required: 'Le pays est requis',
                    pattern: /^[A-Za-z\s]+$/i,
              })} 
              placeholder="Pays" onChange={handleChange} 
            />     
                       

            </div>
            <button className={styles.submit} type="submit">Mettre à jour</button>
        </form>
   </section>
  );
};

export default UpdateForm;