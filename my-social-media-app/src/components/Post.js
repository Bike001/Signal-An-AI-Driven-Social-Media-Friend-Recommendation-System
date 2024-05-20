import React, { useState, useEffect, useContext } from 'react';
import './Post.css';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import ProfilePicture from './ProfilePicture'; // Import the new component


function Post({ id, username, content, image }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);

  // Function to fetch comments
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/myapp/api/posts/${id}/comments/`, {
        headers: {
          'Authorization': `Token ${user.token}`
        }
      });
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [id, user.token, showComments]);

  const handleReplyChange = (event) => {
    setReplyContent(event.target.value);
  };

  const handleReplySubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/myapp/api/posts/${id}/comments/`, { content: replyContent }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${user.token}`
        }
      });

      setReplyContent('');
      setShowReplyBox(false);
      setComments([...comments, response.data]);
      if (!showComments) {
        setShowComments(true);
      }
    } catch (error) {
      console.error('Posting comment failed:', error);
    }
  };

  const toggleCommentsVisibility = () => {
    setShowComments(!showComments);
  };

  const toggleReplyBox = () => {
    setShowReplyBox(!showReplyBox);
  };

  return (
    <div className={`post ${showComments ? 'show-comments' : ''}`}>
      <div className="post-header">
        <ProfilePicture username={username} token={user.token} />
        <div className="post-user">{username}</div>
      </div>
      
      

      <div className="post-content">{content}</div>
      {image && <img src={image} alt="Post" className="post-image" />}  {/* Image rendering here */}
      <div className="post-actions">
        <span className="post-like" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/like-icon.png)` }}></span>
        <span className="post-comment" onClick={toggleReplyBox} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/comment-icon.png)` }}></span>
        {/* Button to toggle comments visibility */}
        <span className="toggle-comments-text" onClick={toggleCommentsVisibility}>
          {showComments ? 'Hide' : 'Show'} Replies ({comments.length})
        </span>
      </div>
      {showReplyBox && (
        <div className="reply-box">
          <textarea placeholder="Write a reply..." value={replyContent} onChange={handleReplyChange} />
          <button onClick={handleReplySubmit}>Reply</button>
        </div>
      )}
      {showComments && (
        <div className="comments-container">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            {/* Apply the post-user class to the user name of the comment */}
            <ProfilePicture username={username} token={user.token} />
            <div className="post-user">{comment.user}</div>
            {/* Apply the post-content class to the content of the comment */}
            <div className="post-content">{comment.content}</div>
            {/* <div className="post-actions">
                <span className="post-like" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/like-icon.png)` }}></span>
                <span className="post-comment" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/comment-icon.png)` }}></span>
            </div> */}
          </div>
        ))}
      </div>
      
      )}
    </div>
  );
}

export default Post;


