import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchResultItem = ({ username }) => {
  const navigate = useNavigate();

  const handleUsernameClick = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <div onClick={handleUsernameClick} className="search-result-item">
      <span>{username}</span>
    </div>
  );
};

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(); // Ref for the search component

  useEffect(() => {
    // Function to detect click outside of search component
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]); // Clears search results, hiding the dropdown
      }
    }
    
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]); // Empty dependency array ensures this effect runs on mount and unmount

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await axios.get(`http://localhost:8000/myapp/api/search`, {
        params: { q: searchTerm },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results: ', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div ref={searchRef} className="search-component"> {/* Set the ref here */}
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((user) => (
            <SearchResultItem key={user.id} username={user.username} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
