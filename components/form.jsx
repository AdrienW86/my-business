import React, {useState} from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form';
import styles from '../styles/Form.module.css'

const MyForm = (props) => {

  const router = useRouter()

  const navigation = (path) => { 
    router.push(path)
}
  const { handleSubmit, control, formState: { errors } } = useForm();
 
  const onSubmit = (data) => {
    console.log(data);
    // Faites quelque chose avec les données du formulaire
  };

  
  return (
    <>
    <div className={styles.modal_body}>
    <h3 className={styles.title}> Nouveau client </h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* Input "name" */}
    <div className={styles.adress}>
    <div className={styles.row}>
        <label className={styles.label}>Nom:</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Le nom est requis' }}
          render={({ field }) => <input {...field} />}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className={styles.row}>
        <label className={styles.label}>Siret:</label>
        <Controller
          name="siret"
          control={control}
          rules={{
            required: 'Le SIRET est requis',
            pattern: {
              value: /^\d{14}$/,
              message: 'Le SIRET doit contenir exactement 14 chiffres',
            },
          }}
          render={({ field }) => <input {...field} />}
        />
        {errors.siret && <p>{errors.siret.message}</p>}
      </div>
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
          {errors.address?.zipcode && <p>{errors.address.zipcode.message}</p>}
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
