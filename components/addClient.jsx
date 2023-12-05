import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from '../styles/Form.module.css'

const AddClientForm = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();

  const token = localStorage.getItem('token')
  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/add-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Client ajouté avec succès');
        // Effectuez des actions supplémentaires si nécessaire
      } else {
        console.error('Erreur lors de l\'ajout du client:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du client:', error.message);
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


      <div className={styles.row}>
        <label className={styles.label}>Email:</label>
        <Controller
          name="email"
          control={control}
          rules={{ required: 'Email requis' }}
          render={({ field }) => <input className={styles.input} {...field} />}
        />    
      </div>
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}


      <div className={styles.row}>
        <label className={styles.label}>Téléphone:</label>
        <Controller
          name="phone"
          control={control}
          rules={{ required: 'Le numéro de téléphone est requis' }}
          render={({ field }) => <input className={styles.input} {...field} />}
        />    
      </div>
      {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}


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

export default AddClientForm;
