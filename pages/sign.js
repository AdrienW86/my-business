import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Logo from '../assets/wallpaper.png'
import Footer from '../components/footer'
import styles from '@/styles/Home.module.css'

export default function Sign() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch('/api/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('User created:', responseData);
        router.push('/');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
      setError('Une erreur s\'est produite lors de la création de l\'utilisateur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <section className={styles.banner}>
          <Image  
            width={270}
            height={270} 
            src={Logo} 
            alt="image de fond" 
            className={styles.wallpaper}
          />
        </section>                 
        <section className={styles.modal}>
          <form className={styles.signForm} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              {...register('email', { required: 'Email requis' })}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            <br />
            <label className={styles.label}>
              Mot de passe:
            </label>
            <input
              type="password"
              name="password"
              {...register('password', { required: 'Mot de passe requis' })}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            <br />
           
            <button
              disabled={loading}
              className={styles.link}
              type="submit"
            >
              {loading ? 'Chargement...' : 'S\'inscrire'}
            </button>
          </form>           
        </section>                                                          
      </main>
      <Footer />
    </>
  )
}