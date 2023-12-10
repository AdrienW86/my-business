import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from '../styles/Form.module.css'
import { useRouter } from 'next/router';

const AddClientForm = () => {

  const router = useRouter()

  const navigation = () => {
    router.push('/clients')
  }
  
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
    };

    checkToken();
  }, [router]);

  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
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
       navigation()
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
    <div className={styles.adress}>
    <label className={styles.label_adress}>Informations:</label>
    <div className={styles.row}>
        <label className={styles.label}>Nom:</label>
        <Controller
          name="name"
          control={control}      
          rules={{ required: 'Le nom est requis' }}
          render={({ field }) => <input placeholder="Nom du client" className={styles.input} {...field} />}
        />    
      </div>
      {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      <div className={styles.row}>
        <label className={styles.label}>Email:</label>
        <Controller
          name="email"
          control={control}
          rules={{ required: 'Email requis' }}
          render={({ field }) => <input placeholder="Email du client" className={styles.input} {...field} />}
        />    
      </div>
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      <div className={styles.row}>
        <label className={styles.label}>Téléphone:</label>
        <Controller
          name="phone"
          control={control}
          rules={{ required: 'Le numéro de téléphone est requis' }}
          render={({ field }) => <input placeholder="Téléphone du client" className={styles.input} {...field} />}
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
            rules={{ required: 'Numéro de la rue requis' }}
            render={({ field }) => <input placeholder="Numéro" className={styles.input}  {...field} type="number" />}
          />
        </div>
        {errors.address?.number && (<p className={styles.error}>{errors.address.number.message}</p>)}
        <div className={styles.row}>
          <label className={styles.label}>Rue:</label>
          <Controller
            name="address.street"
            control={control}
            rules={{ required: 'Nom de la rue requis' }}
            render={({ field }) => <input
            placeholder="Nom de la rue" className={styles.input} {...field} />}
          />
        </div>
        {errors.address?.street && (<p className={styles.error}>{errors.address.street.message}</p>)}        
        <div className={styles.row}>
          <label className={styles.label}>Ville:</label>
          <Controller
            name="address.city"
            control={control}
            rules={{ required: 'Nom de la ville requis' }}
            render={({ field }) => <input placeholder="Nom de la ville" className={styles.input} {...field} />}
          />
        </div>
        {errors.address?.city && <p className={styles.error}>{errors.address.city.message}</p>}
        <div className={styles.row}>
          <label className={styles.label}>Code postal:</label>
          <Controller
            name="address.zipcode"
            control={control}
            rules={{
              type: 'number',
              required: 'Code postal requis (5 chiffres)',
              pattern: {
                value: /^\d{5}$/,               
              },
            }}
            render={({ field }) => <input placeholder="Code postal" className={styles.input}  {...field} type="number" />}
          />       
        </div>
        {errors.address?.zipcode && <p className={styles.error}>{errors.address.zipcode.message}</p>}
        <div className={styles.row}>
          <label className={styles.label}>Pays:</label>
          <Controller
            name="address.country"
            control={control}
            rules={{ required: 'Nom du pays requis' }}
            render={({ field }) => <input placeholder="Pays" className={styles.input} {...field} />}
          />
        </div>
        {errors.address?.country && <p className={styles.error}>{errors.address.country.message}</p>}
      </div>
      <div className={styles.box_btn}>
        <button 
            className={styles.add_btn} 
            type="submit">Ajouter
        </button>
        <button 
           onClick={navigation}
            className={styles.close_btn}> Annuler
        </button>
      </div>   
    </form>
  </div>
  </>   
  );
};
export default AddClientForm;