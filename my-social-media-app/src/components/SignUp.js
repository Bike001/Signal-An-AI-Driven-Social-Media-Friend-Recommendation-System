// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Make sure the CSS file is in the same directory

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');
    setIsSignUpSuccess(false); // Reset the success message before the new sign-up attempt

    axios.post('http://localhost:8000/myapp/signup/', {
      username: username,
      email: email,
      password: password
    })
    .then(response => {
      console.log(response.data);
      setIsSignUpSuccess(true); // Set success state to true

      // Redirect the user after a short delay to see the success message
      setTimeout(() => {
        navigate('/login'); // Adjust the route as needed for your app's routing setup
      }, 3000); // 3-second delay
    })
    .catch(error => {
      console.error('An error occurred during sign up:', error.response ? error.response.data : error);
      setError('An error occurred during sign up. Please try again.');
    });
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      {isSignUpSuccess && <div className="success-message">Sign up successful!</div>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignUp}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input 
            id="username"
            type="text"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input 
            id="email"
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input 
            id="password"
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      <p className="login-link" onClick={() => navigate('/login')}>
        Already have an account? Log in
      </p>
    </div>
  );
}

export default SignUp;
