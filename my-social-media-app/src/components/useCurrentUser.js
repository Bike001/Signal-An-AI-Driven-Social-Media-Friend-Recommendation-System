import { useState, useEffect } from 'react';
import axios from 'axios';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userStr = localStorage.getItem('user'); // Get the stringified user object
      const userObj = userStr && JSON.parse(userStr); // Parse it to get the user object
      const token = userObj && userObj.token; // Get the token from the user object

      try {
        const response = await axios.get('http://localhost:8000/myapp/api/myuser/', {
          headers: {
            'Authorization': `Token ${token}` // Use the retrieved token
          }
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { currentUser, isLoading };
};

export { useCurrentUser };
