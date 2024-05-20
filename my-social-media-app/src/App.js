import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import PostCreator from './components/PostCreator';
import PostList from './components/PostList';
import FriendsPage from './components/FriendsPage';
import MessagesPage from './components/MessagesPage';
import ProfilePage from './components/ProfilePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import OwnProfilePage from './components/OwnProfilePage';
import RedirectToLogin from './components/RedirectToLogin';
import { UserProvider } from './contexts/UserContext'; // Note: Import only UserProvider if that's the named export
import UserContext from './contexts/UserContext'; // Import the default export as UserContext

import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext); // Accessing user from context

  const handleSearchResults = (results) => {
    // Do something with the results
  };

  const handleSearchError = (error) => {
    // Do something with the error
  };

  // Function to fetch posts
  const fetchPosts = () => {
    // Retrieve the user from localStorage
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Only proceed if we have a user and token
    if (user && user.token) {
      axios.get('/api/posts/', {
        headers: {
          Authorization: `Token ${user.token}`
        }
      })
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the posts', error);
      });
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Debugging useEffect to log user state and localStorage after logout
  useEffect(() => {
    console.log('User state has changed:', user);
    console.log('localStorage should be:', localStorage.getItem('user')); // Should match the user state
  }, [user]);

  return (
    <UserProvider> {/* Wrap the Router with UserProvider */}
      <Router>
        <div className="App">
          <Header onSearch={handleSearchResults} onError={handleSearchError} />
          <Routes>
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/profile" element={<OwnProfilePage />} />
            <Route path="/" element={
              <>
                <RedirectToLogin /> {/* Include the redirect component */}
                <PostCreator fetchPosts={fetchPosts} />
                <PostList posts={posts} />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
