import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      console.log('User removed from localStorage');
    }
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/myapp/api/login/', {
        username,
        password,
      });
      const userData = {
        ...response.data.user,
        token: response.data.token,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  // Redirects to the signup page
  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  // Placeholder for future forgot password functionality
  const handleForgotPassword = () => {
    // Implement forgot password functionality here
    console.log('Forgot password clicked');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Email or phone number"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">Log In</button>
      
        <button onClick={handleSignUpRedirect} className="signup-button">Create new account</button>
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default Login;
