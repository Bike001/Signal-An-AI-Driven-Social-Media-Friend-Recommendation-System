import React, { useState } from 'react';
import './MessageModal.css'; // Ensure this CSS file exists and styles your modal

const MessageModal = ({ username, profileUser, onClose, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    console.log('Profile user at send:', profileUser); // Add this line to debug
    
    if (!profileUser || !profileUser.username) {
        console.error('Profile user data is not available', profileUser);
        return;
      }
  
    console.log('Sending message to:', profileUser.username); // Debug: log the username being sent
  
    if (message.trim() && profileUser && profileUser.username) {
      onSendMessage(message, profileUser.username);
      setMessage(''); // Clear the message input after sending
    } else {
      // Handle the case where profileUser or profileUser.username is not available
      console.error('Profile user data is not available', profileUser);
    }
  };

  return (
    <div className="message-modal">
      <div className="message-modal-content">
        <div className="message-modal-header">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Send Message to {username}</h2>
        </div>
        <div className="message-modal-body">
          <textarea 
            value={message}
            onChange={handleMessageChange}
            placeholder="Type your message here..."
          />
        </div>
        <div className="message-modal-footer">
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
