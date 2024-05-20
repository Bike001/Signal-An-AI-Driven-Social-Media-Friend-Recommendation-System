import { Link } from 'react-router-dom';
import './Header.css';
import SearchComponent from './SearchComponent';
import React, { useContext } from 'react';
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router-dom'; 
import UserContext from '../contexts/UserContext'; 

function Header({ onSearch, onError }) {
  const { logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  

  const handleLogout = () => {
    // Perform logout logic like clearing auth tokens or user data
    // Redirect to login page
    logoutUser(); 
    navigate('/login'); 
  };
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src="/logo.png" alt="Logo" className="logo-img" />
      </Link>
      <div className="search-wrapper">
      <SearchComponent onResults={onSearch} onError={onError} />
      </div>
      <nav>
        <Link to="/" className="nav-link">
          <img src="/Homepage.png" alt="Homepage" className="nav-img home-img" />
        </Link>
        <Link to="/friends" className="nav-link">
          <img src="/friends.png" alt="Friends" className="nav-img friends-img" />
        </Link>
        <Link to="/messages" className="nav-link">
          <img src="/message.png" alt="Messages" className="nav-img messages-img" />
        </Link>
        <Link to="/profile" className="nav-link">
          <img src="/profile.png" alt="Profile" className="nav-img profile-img" />
        </Link>
        
      </nav>
      <Dropdown onLogout={handleLogout} /> {/* Add the Dropdown component */}
      
    </header>
  );
}

export default Header;
