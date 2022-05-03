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

  console.log(socket);

  useEffect(() => {
    if (user) setSocket(io.connect('/'));
  }, [user]);

  const handleSignOn = async (screenName, password) => {
    try {
      const user = await axios.post('/api/sign-on', {
        screenName,
        password
      });
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
      // console.log(room)
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
