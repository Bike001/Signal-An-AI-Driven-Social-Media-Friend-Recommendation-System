import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePicture = ({ username, token }) => {
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  
  // Define your backend base URL here
  const backendBaseUrl = 'http://localhost:8000'; // Replace with the actual URL if different

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await axios.get(`${backendBaseUrl}/myapp/api/user/profile-picture/`, {
          params: { username },
          headers: { 'Authorization': `Token ${token}` }
        });
        // Prepend the backend base URL if the response provides a relative path
        const fullProfilePicUrl = response.data.profile_picture_url.startsWith('http')
          ? response.data.profile_picture_url
          : `${backendBaseUrl}${response.data.profile_picture_url}`;
        setProfilePicUrl(fullProfilePicUrl);
      } catch (error) {
        console.error('Failed to fetch profile picture:', error);
        setProfilePicUrl(null); // Ensure we catch and set to null if there's an error
      }
    };

    fetchProfilePic();
  }, [username, token, backendBaseUrl]);

  // Use the default image from the public folder if profilePicUrl is not set
  const imageUrl = profilePicUrl || process.env.PUBLIC_URL + '/default.png';

  return (
    <img src={imageUrl} alt={`${username}'s Profile`} className="profile-picture" />
  );
};

export default ProfilePicture;
