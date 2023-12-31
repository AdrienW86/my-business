import React, {useState} from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form';
import styles from '../styles/Form.module.css'

import { useUser } from '@/utils/UserContext';

const MyForm = (props) => {

  const defaultData = {
    name: '',
    siret: '',
    address: {
      number: '',
      street: '',
      city: '',
      zipcode: '',
      country: '',
    },
  };
  
  const { addClient } = useUser();

  const router = useRouter()

  const navigation = (path) => { 
    router.push(path)
}
const { handleSubmit, control, setValue, formState: { errors } } = useForm({
  defaultValues: defaultData, // Utilisez les valeurs par défaut ici
});

  const onSubmit = async (data) => {
    console.log(data)
    try {
      // Call the addClient function with the form data
      await addClient(data);

      // Do something after adding the client, if needed

      // Navigate to a different path or perform other actions
      navigation(props.path);
    } catch (error) {
      console.error('Error adding client:', error.message);
      // Handle error, show a message, or perform other actions
    }
  };

  return (
    <>
    <div className={styles.modal_body}>
    <h1 className={styles.title}> Nouveau client </h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* Input "name" */}
    <div className={styles.adress}>
    <label className={styles.label_adress}>Informations:</label>
    <div className={styles.row}>
        <label className={styles.label}>Nom:</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Le nom est requis' }}
          render={({ field }) => <input className={styles.input} {...field} />}
        />    
      </div>
      {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      <div className={styles.row}>
        <label className={styles.label}>Siret:</label>
        <Controller
          name="siret"
          control={control}
          rules={{
            required: 'Le SIRET est requis',
            pattern: {
              value: /^\d{14}$/,
              message: 'Le SIRET doit contenir 14 chiffres',
            },
          }}
          render={({ field }) => <input {...field} />}
        />
      </div>
      {errors.siret && <p className={styles.error} >{errors.siret.message}</p>}
    </div>
    <div className={styles.adress}>
      <label className={styles.label_adress}>Adresse:</label>
        <div className={styles.row}>
          <label className={styles.label}>Numéro:</label>
          <Controller
            name="address.number"
            control={control}
            render={({ field }) => <input {...field} type="number" />}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Rue:</label>
          <Controller
            name="address.street"
            control={control}
            render={({ field }) => <input {...field} />}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Ville:</label>
          <Controller
            name="address.city"
            control={control}
            render={({ field }) => <input {...field} />}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Code postal:</label>
          <Controller
            name="address.zipcode"
            control={control}
            rules={{
              type: 'number',
              pattern: {
                value: /^\d{5}$/,
                message: 'Le code postal doit contenir exactement 5 chiffres',
              },
            }}
            render={({ field }) => <input {...field} />}
          />
          {errors.address?.zipcode && <p className={styles.error}>{errors.address.zipcode.message}</p>}
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Pays:</label>
          <Controller
            name="address.country"
            control={control}
            render={({ field }) => <input {...field} />}
          />
        </div>
      </div>
      <div className={styles.box_btn}>
        <button 
            className={styles.add_btn} 
            type="submit">Soumettre
        </button>
        <button 
           onClick={() => navigation(props.path)}
            className={styles.close_btn}> Annuler
        </button>
      </div>   
    </form>
  </div>
  </>   
  );
};

export default MyForm;