import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.css'; 

function Dropdown({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Add a function to close the dropdown
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="dropdown" onMouseLeave={closeDropdown}>
      <button onClick={toggleDropdown} className="dropdown-button">
        ☰
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>
            <Link to="/login" onClick={onLogout} className="dropdown-link">
              Log Out
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
