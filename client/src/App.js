import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

import SignOn from './components/SignOn';
import BuddyList from './components/buddyList';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('savedUser'));
    (async () => {
      const tokenStatus = await axios.post('/api/token/verify', {}, {
        headers: { Authorization: `bearer ${savedUser.token}` }
      });
      console.log(tokenStatus.data.valid);
      if (savedUser && tokenStatus.data.valid) {
        setUser(savedUser);
      }
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
      const room = await axios.get('/api/rooms/buddy-chat', {
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
      {!user &&
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
    </div>
  );
};

export default App;
