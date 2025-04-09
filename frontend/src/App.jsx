// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import FriendList from './components/FriendList';
import FriendForm from './components/FriendForm';

function App() {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFriend, setEditingFriend] = useState(null);

  const API_URL = 'http://localhost:5000/api/friends';

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch friends');
      }
      const data = await response.json();
      setFriends(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addFriend = async (friendData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(friendData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add friend');
      }

      const newFriend = await response.json();
      setFriends([...friends, newFriend]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updateFriend = async (id, friendData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(friendData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update friend');
      }

      const updatedFriend = await response.json();
      setFriends(friends.map(friend => friend.id === id ? updatedFriend : friend));
      setEditingFriend(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const deleteFriend = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete friend');
      }

      setFriends(friends.filter(friend => friend.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 shadow-lg py-4 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white text-center">Friend Manager</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">My Friends</h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                Error: {error}
              </div>
            )}

            <FriendForm
              onSubmit={editingFriend ? (data) => updateFriend(editingFriend.id, data) : addFriend}
              initialData={editingFriend}
              onCancel={editingFriend ? () => setEditingFriend(null) : undefined}
            />

            {isLoading ? (
              <div className="text-center py-4">Loading friends...</div>
            ) : (
              <FriendList
                friends={friends}
                onEdit={setEditingFriend}
                onDelete={deleteFriend}
              />
            )}
          </div>
        </div>
      </div>
    </div>
      );
}

      export default App;