// Importez les dépendances nécessaires
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import styles from '@/styles/Form.module.css'; // Assurez-vous d'avoir le fichier de style correspondant

const UpdateClientForm = ({ clientId, updateClient, toggle, setToggle }) => {

  const router = useRouter()
  const { handleSubmit, control, reset, formState: { errors } } = useForm();

  // Utilisez la fonction handleSubmit pour soumettre le formulaire
  const onSubmit = (formData) => {
    updateClient(clientId, formData);
    
    reset()
    alert('Client modifié avec succès')
    navigation()
   
  };
const navigation = () => {
  router.push('/clients')
}

  return (
    <div className={styles.modal_body}>
    <h1 className={styles.title}> Modifier le client </h1>
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
            type="submit">Modifier
        </button>
        <button          
            className={styles.close_btn} onClick={navigation}> Annuler
        </button>
      </div>   
    </form>
  </div>    
  );
};

export default UpdateClientForm;
