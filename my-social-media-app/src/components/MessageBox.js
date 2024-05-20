import React from 'react';


function MessageBox({ friendUsername, messages }) {
  return (
    <div className="message-box">
      <h3>Conversation with {friendUsername}</h3>
      {messages.map((message) => (
        <div key={message.id} className="message">
          {message.content} <small>{new Date(message.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}



export default MessageBox;
