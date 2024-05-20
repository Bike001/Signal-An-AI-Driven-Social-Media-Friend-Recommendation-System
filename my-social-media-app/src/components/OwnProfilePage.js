import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Post from './Post';  // Ensure this component is ready to receive and display the image prop.
import ProfilePictureUploader from './ProfilePictureUploader';
import UserContext from '../contexts/UserContext';
import './OwnProfilePage.css';

function OwnProfilePage() {
  const [userPosts, setUserPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [showUploader, setShowUploader] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      // Fetch the profile information of the logged-in user
      axios.get(`http://localhost:8000/myapp/api/ownprofile`, {
        headers: { Authorization: `Token ${user.token}` }
      })
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile info:', error);
      });

      // Fetch the posts of the logged-in user
      axios.get(`http://localhost:8000/myapp/api/ownposts`, {
        headers: { Authorization: `Token ${user.token}` }
      })
      .then(response => {
        setUserPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching user posts:', error);
      });
    }
  }, [user]);

  // Function to handle the file upload
  const handleProfilePictureUpload = (file) => {
    const formData = new FormData();
    formData.append('profile_picture', file);

    axios.post('http://localhost:8000/myapp/api/upload_profile_picture/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${user.token}`
      }
    })
    .then(response => {
      // Handle the successful upload here
      setShowUploader(false); // Hide the uploader after successful upload
    })
    .catch(error => {
      console.error('Error uploading profile picture:', error);
    });
  };

  if (!user) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div className="profile-page">
      <h1 onClick={() => setShowUploader(!showUploader)}>
        {profile?.username || 'Your'} Profile
      </h1>

      {showUploader && <ProfilePictureUploader onUpload={handleProfilePictureUpload} />}
      
      <div className="user-posts">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <Post key={post.id} {...post} image={post.image_url} /> // Ensure you pass the correct prop for the image
          ))
        ) : (
          <p>You haven't posted anything yet.</p>
        )}
      </div>
    </div>
  );
}

export default OwnProfilePage;
