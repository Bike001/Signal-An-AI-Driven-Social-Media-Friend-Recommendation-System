import React, { useState, useEffect, useContext } from 'react';
import './FriendsSuggestion.css'; // Ensure this CSS file is properly set up
import axios from 'axios'; // Axios must be installed (`npm install axios`)
import UserContext from '../contexts/UserContext'; // Adjust the import path as needed
import ProfilePicture from './ProfilePicture'; // Import the ProfilePicture component

function FriendsSuggestion() {
  const [suggestions, setSuggestions] = useState([]);
  const { user, logoutUser } = useContext(UserContext); // Use logoutUser for logging out

  useEffect(() => {
    if (user && user.token) {
      axios.get('http://localhost:8000/myapp/api/friend-suggestions/', {
        headers: {
          'Authorization': `Token ${user.token}` // Use the token from user context
        }
      })
      .then(response => {
        setSuggestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching friend suggestions:', error);
        // If there's a 401 error, it could mean the token is invalid or expired
        if (error.response && error.response.status === 401) {
          logoutUser(); // Use the logoutUser function from context to logout
          // Redirect to the login page or show a message
        }
      });
    } else {
      // If there is no user or token, handle accordingly
      console.error('No user or token found! User must login.');
      // Redirect to login or show an error
    }
  }, [user, logoutUser]); // Add user and logoutUser to dependency array to re-run effect when they change

  const sendFriendRequest = (username) => {
    axios.post(`http://localhost:8000/myapp/send-friend-request/${username}/`, {}, {
      headers: { 'Authorization': `Token ${user.token}` }
    })
    .then(() => {
      // Update UI to indicate the friend request was sent
      window.alert(`Friend request sent to ${username}!`);
      
      // Remove the user from the suggestions state
      setSuggestions(prevSuggestions => 
        prevSuggestions.filter(suggestion => suggestion.username !== username)
      );
    })
    .catch(error => {
      console.error('Error sending friend request:', error);
      // Handle error, maybe the user already sent a request, or isn't logged in
    });
  };

  return (
    <div className="friends-suggestion">
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div key={index} className="suggestion">
            <ProfilePicture username={suggestion.username} token={user.token} className="profile-picture" />
            <span>{suggestion.username}</span> {/* Adjust if the key is different */}
            <button onClick={() => sendFriendRequest(suggestion.username)}>Add</button> {/* Changed from '+' to 'Add' */}
          </div>
        ))
      ) : (
        <p>No friends suggestions available.</p>
      )}
    </div>
  );
}

export default FriendsSuggestion;
