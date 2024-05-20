// In your Logout component
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext'; // Adjust the path as needed

const Logout = () => {
  const { logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

 

  return (
    <button onClick={() => console.log('Logout button clicked')}>Logout</button>
  );
};

export default Logout;
