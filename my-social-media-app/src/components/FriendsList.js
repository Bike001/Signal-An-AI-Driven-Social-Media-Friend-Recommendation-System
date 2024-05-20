import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './FriendsList.css';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import ProfilePicture from './ProfilePicture'; // Import the ProfilePicture component

function FriendsList() {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriendsList = async () => {
      if (user && user.token) {
        try {
          const response = await axios.get('http://localhost:8000/myapp/api/friends-list/', {
            headers: { 'Authorization': `Token ${user.token}` },
          });
          setFriends(response.data);
        } catch (error) {
          console.error('Error fetching friends list:', error);
        }
      }
    };
  
    fetchFriendsList();
  }, [user]);

  const handleFriendClick = (username) => {
    navigate(`/profile/${username}`); // Redirect to friend's profile page
  };

  return (
    <div className="friends-list">
      {friends.length > 0 ? (
        friends.map((friend) => (
          <div key={friend.id} className="friend" onClick={() => handleFriendClick(friend.username)}>
            <ProfilePicture username={friend.username} token={user.token} />
            <span>{friend.username}</span>
          </div>
        ))
      ) : (
        <p>No friends yet.</p>
      )}
    </div>
  );
}

export default FriendsList;
