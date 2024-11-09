import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { User } from 'shared/Interfaces/User';

const Panel = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('userapi/status', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch login status');
        }
        const data = await response.json();
        if (data.loggedIn) {
          setLoggedIn(true);
          setUser(data.user);
        } else {
          setLoggedIn(false);
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  if (!loggedIn) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h2>User Panel</h2>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>User Type: {user.type}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );

  async function handleLogout() {
    try {
      const response = await fetch('http://127.0.0.1:3001/userapi/logout', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      navigate('/'); 
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
};

export default Panel;
