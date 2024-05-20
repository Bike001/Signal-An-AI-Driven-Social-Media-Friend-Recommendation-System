import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from './Post'; // Make sure the Post component can handle the 'image' prop
import UserContext from '../contexts/UserContext';
import MessageModal from './MessageModal';
import { useCurrentUser } from './useCurrentUser';
import './ProfilePage.css';

function ProfilePage() {
  const { currentUser } = useCurrentUser(); // Note: This isn't used, you might consider removing it if not needed
  const [userPosts, setUserPosts] = useState([]);
  const [profileUser, setProfileUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);
  const { username } = useParams();

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchProfileAndPosts = async () => {
      try {
        // Fetch profile information
        const profileResponse = await axios.get(`http://localhost:8000/myapp/api/profile/${username || user.username}`, {
          headers: { Authorization: `Token ${user.token}` },
        });
        setProfileUser(profileResponse.data);

        // Fetch posts made by the user
        const postsResponse = await axios.get(`http://localhost:8000/myapp/api/user/${username || user.username}/posts`, {
          headers: { Authorization: `Token ${user.token}` },
        });
        setUserPosts(postsResponse.data);
      } catch (error) {
        console.error('Error fetching profile or posts:', error);
      }
    };

    fetchProfileAndPosts();
  }, [user, username]);

  // Other functions (openModal, closeModal, sendMessage) can remain unchanged
  const openModal = () => {
    if (profileUser) {
      setShowModal(true);
    } else {
      console.error('Profile user data not loaded. Cannot open modal.');
    }
  };

  const closeModal = () => setShowModal(false);

  const sendMessage = async (messageContent, receiverUsername) => {
    if (!messageContent.trim()) {
      // If the message is empty or only whitespace, don't send it
      return;
    }
  
    const userStr = localStorage.getItem('user'); // Get the stringified user object
    const userObj = userStr && JSON.parse(userStr); // Parse it to get the user object
    const token = userObj && userObj.token; // Get the token from the user object
  
    try {
      await axios.post(
        'http://localhost:8000/myapp/api/messages/',
        {
          receiver_username: receiverUsername, // Make sure this key matches what your backend expects
          content: messageContent,
        },
        {
          headers: { Authorization: `Token ${token}` }, // Use the retrieved token
        }
      );
      // Handle successful message send...
      closeModal(); // You might want to close the modal on successful send
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!user) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    

<div className="profile-page">
      <div className="profile-header">
      <div className="profile-header-inner">
        <h1>{profileUser ? `${profileUser.username}'s Profile` : 'Loading profile...'}</h1>
        <button onClick={openModal} disabled={!profileUser} className="send-button">
          <img src="/send.png" alt="Send Message" />
        </button>
      </div>
    </div>
      {showModal && profileUser && (
        <MessageModal
          username={profileUser.username}
          profileUser={profileUser}
          onClose={closeModal}
          onSendMessage={sendMessage}
        />
      )}
      {/* Profile header and messaging components remain unchanged */}
      {/* ... */}

      <div className="user-posts">
        {userPosts.length > 0 ? (
          userPosts.map(post => (
            // Update here to pass the 'image' prop correctly as done in PostList
            <Post key={post.id} username={post.username} content={post.content} />
          ))
        ) : (
          <p>No posts to show.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
