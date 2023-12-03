const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token missing');
        return;
      }

      const response = await fetch('/api/profil', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('User data:', userData);
        setUserProfil(userData);
      } else {
        console.error('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };