import React, { useState, useEffect, useContext } from 'react';
import './FriendRequestList.css';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import ProfilePicture from './ProfilePicture'; // Make sure to import the ProfilePicture component

function FriendRequestList() {
  const [friendRequests, setFriendRequests] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Fetch the friend requests on component mount
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/myapp/api/friend-requests/', {
          headers: { 'Authorization': `Token ${user.token}` },
        });
        setFriendRequests(response.data);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    if (user) {
      fetchFriendRequests();
    }
  }, [user]);

  const handleAccept = async (requestId) => {
    try {
      await axios.post(`http://localhost:8000/myapp/approve-friend-request/${requestId}/`, {}, {
        headers: { 'Authorization': `Token ${user.token}` },
      });
      // Filter out the accepted request
      setFriendRequests(currentRequests => currentRequests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  // Similar handler for reject, if necessary

  return (
    <div className="friend-requests">
      {friendRequests.length > 0 ? (
        friendRequests.map((request) => (
          <div key={request.id} className="friend-request">
            <ProfilePicture username={request.from_user.username} token={user.token} />
            <span className="friend-name">{request.from_user.username}</span>
            <button className="accept-button" onClick={() => handleAccept(request.id)}>Accept</button>
            {/* Replace the Unicode check mark with text */}
            {/* Similar button for reject */}
          </div>
        ))
      ) : (
        <p>No friend requests.</p>
      )}
    </div>
  );
}

export default FriendRequestList;
