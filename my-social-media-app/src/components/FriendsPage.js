import React from 'react';
import FriendRequestList from './FriendRequestList';
import FriendsSuggestion from './FriendsSuggestion';
import FriendsList from './FriendsList';
import './FriendsPage.css'; // You'll need to create this CSS file

function FriendsPage() {
  return (
    <div className="friends-page">
      <h2>Friend Requests</h2>
      <FriendRequestList />
      
      <h2>Friends Suggestion</h2>
      <FriendsSuggestion />
      
      <h2>Friends List</h2>
      <FriendsList />
    </div>
  );
}

export default FriendsPage;
