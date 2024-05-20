import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import './MessagesPage.css';

function MessagesPage() {
  const { user } = useContext(UserContext);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [reply, setReply] = useState({}); // Using an object to map message IDs to replies

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      try {
        const response = await axios.get('http://localhost:8000/myapp/api/get_conversations/', {
          headers: { Authorization: `Token ${user.token}` },
        });
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, [user]);

  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleReplyChange = (messageId, event) => {
    setReply({ ...reply, [messageId]: event.target.value });
  };

  const handleSendReply = async (messageId, receiverUsername) => {
    if (!reply[messageId] || !reply[messageId].trim()) return;

    try {
      await axios.post('http://localhost:8000/myapp/api/messages/', {
        receiver_username: receiverUsername,
        content: reply[messageId],
      }, {
        headers: { Authorization: `Token ${user.token}` },
      });
      setReply({ ...reply, [messageId]: "" }); // Clear the reply for this messageId after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  


  return (
    <div className="messages-page">
      <div className="conversations-list">
        {conversations.map((conversation, index) => (
          <div key={index} onClick={() => selectConversation(conversation)}>
            Conversation with {conversation.username}
          </div>
        ))}
      </div>
      {selectedConversation && (
  <div className="selected-conversation">
    <h3>Conversation with {selectedConversation.username}</h3>
    {/* Reverse the array to display the most recent messages at the bottom */}
    {selectedConversation.messages.slice().reverse().map((message) => (
  <div key={message.id} className={`message ${message.sender === user.username ? 'sent' : 'received'}`}>
    {/* Display 'You' for sent messages, or the sender's username for received messages */}
    <strong>{message.sender === user.username ? 'You' : message.sender}</strong>
    <p>{message.content}</p>
    <small>Sent at: {new Date(message.timestamp).toLocaleString()}</small>
  </div>
))}
          <div className="reply-section">
            <input
              type="text"
              value={reply[selectedConversation.username] || ''}
              onChange={(e) => handleReplyChange(selectedConversation.username, e)}
              placeholder="Type your reply"
            />
            <button onClick={() => handleSendReply(selectedConversation.username, selectedConversation.username)}>
              Send Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessagesPage;
