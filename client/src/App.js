import { useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

import SignOn from './components/SignOn';
import BuddyList from './components/buddyList';

const App = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  console.log(user);

  if (user) {
    var socket = io.connect('/');
    console.log(socket);
  }

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
    setUser(null);
  };
  
  // const joinRoom = async (userId, buddyId) => {
  //   console.log('join room', userId, buddyId);
  //   try {
  //     const room = await axios.get('/api/rooms',{
  //       userId,
  //       buddyId
  //     });
  //     console.log(room);
  //   } catch (err) {
  //     console.error(err.response.data);
  //     setErrorMessage(err.response.data.error);
  //   }
  // };

  return (
    <div>
      {!user &&
        <div>
          <SignOn
            handleSignOn={handleSignOn}
          />
          {errorMessage}
        </div>
      }
      {user &&
        <BuddyList
          user={user}
          handleSignOut={handleSignOut}
          // joinRoom={joinRoom}
        />
      }
    </div>
  );
};

export default App;
