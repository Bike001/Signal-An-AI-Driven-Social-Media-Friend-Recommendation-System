import React, { createContext, useState, useEffect } from 'react';

// Creating the context object and providing initial default values
const UserContext = createContext({
  user: null,
  setUser: () => {},
  logoutUser: () => {},
  isLoading: true // Track if we are in the process of logging in/out or checking auth
});

// UserProvider component that wraps your app and provides user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [isLoading, setIsLoading] = useState(!user); // Loading is true if there is no user initially

  // This effect runs when the user state changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user)); // Sync user state with localStorage
    setIsLoading(false); // Set loading to false once user state is set
  }, [user]);

  const logoutUser = () => {
    console.log('Executing logoutUser');
    localStorage.removeItem('user'); // This should remove the user item from localStorage
    setUser(null); // This should set the user state to null
  };

  // The provider component makes the user and functions available down the component tree
  return (
    <UserContext.Provider value={{ user, setUser, logoutUser, isLoading }}>
      {isLoading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};

export default UserContext;
