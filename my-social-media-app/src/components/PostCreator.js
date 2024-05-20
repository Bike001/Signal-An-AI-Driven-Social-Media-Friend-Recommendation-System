import React, { useState, useContext, useRef } from 'react';
import UserContext from '../contexts/UserContext';
import './PostCreator.css';
import cameraIcon from '../assets/camera.png';

function PostCreator({ fetchPosts }) {
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef();
  const { user } = useContext(UserContext);

  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      alert('Please select an image file.');
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    if (!postContent.trim() && !image) {
      alert('Please enter some content or select an image to post.');
      return;
    }

    if (user && user.token) {
      setIsSubmitting(true); // Disable the submit button
      const formData = new FormData();
      formData.append('content', postContent.trim());
      if (image) {
        formData.append('image', image);
      }

      try {
        const response = await fetch('http://localhost:8000/myapp/api/posts/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${user.token}`,
            // Content-Type is not set because the browser will set it with the correct boundary
          },
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Post created:', data);
          setPostContent('');
          setImage(null);
          fetchPosts(); // Refresh posts
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to create post. Please try again.');
      }
      setIsSubmitting(false); // Re-enable the submit button
    } else {
      console.error('User token is not available.');
      alert('Authentication error. Please log in.');
    }
  };

  return (
    <div className="post-creator">
      <textarea
        value={postContent}
        onChange={handlePostChange}
        placeholder="What's on your mind?"
        className="post-textarea"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
        accept="image/*"
      />
      <button onClick={handleImageUpload} className="camera-button">
        <img src={cameraIcon} alt="Upload" style={{ width: '15px', height: '15px' }} />
      </button>
      <button onClick={handlePostSubmit} disabled={isSubmitting}>Post</button>
    </div>
  );
}

export default PostCreator;
