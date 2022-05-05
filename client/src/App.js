import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

import SignOn from './components/SignOn';
import BuddyList from './components/BuddyList';
import ChatWindow from './components/ChatWindow';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [checkedForSavedUser, setCheckedForSavedUser] = useState(false);
  const [room, setRoom] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('savedUser'));
    (async () => {
      if (savedUser) {
        const tokenStatus = await axios.post('/api/token/verify', {}, {
          headers: { Authorization: `bearer ${savedUser.token}` }
        });
        if (tokenStatus.data.valid) {
          setUser(savedUser)
          localStorage.setItem('savedUser', JSON.stringify({
            ...savedUser,
            token: tokenStatus.data.newToken
          }));
        }
      }
      setCheckedForSavedUser(true);
    })();
  }, []);

  useEffect(() => {
    if (user) setSocket(io.connect('/'));
  }, [user]);

  const handleSignOn = async (screenName, password) => {
    try {
      const user = await axios.post('/api/users/sign-on', {
        screenName,
        password
      });
      localStorage.setItem('savedUser', JSON.stringify(user.data));
      setUser(user.data);
      setErrorMessage('');
    } catch (err) {
      console.error(err.response.data);
      setErrorMessage(err.response.data.error);
    }
  };

  const handleSignOut = () => {
    socket.disconnect();
    setRoom(null);
    setUser(null);
    setSocket(null);
    localStorage.removeItem('savedUser');
  };
  
  const joinRoom = async (userId, buddyId) => {
    try {
      const room = await axios.get('/api/rooms/', {
        headers: {
          Authorization: `bearer ${user.token}`
        },
        params: {
          userId,
          buddyId
        }
      });
      setRoom(room.data);
    } catch (err) {
      console.error(err.response.data);
      setErrorMessage(err.response.data.error);
    }
  };

  return (
    <div>
      {checkedForSavedUser && !user &&
        <div>
          <SignOn handleSignOn={handleSignOn} />
          {errorMessage}
        </div>
      }
      {user &&
        <BuddyList
          user={user}
          room={room}
          handleSignOut={handleSignOut}
          joinRoom={joinRoom}
        />
      }
      {room &&
        <ChatWindow
          socket={socket}
          room={room}
        />
      }
    </div>
  );
};

export default App;
