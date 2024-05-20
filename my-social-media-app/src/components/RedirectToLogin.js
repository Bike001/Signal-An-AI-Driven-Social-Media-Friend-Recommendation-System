// RedirectToLogin.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      navigate('/login');
    }
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default RedirectToLogin;
