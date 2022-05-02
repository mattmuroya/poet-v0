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
      const res = await axios.post('/api/sign-on', {
        screenName,
        password
      });
      setUser({
        screenName: res.data.screenName,
        buddyList: res.data.buddyList
      });
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
  
  const joinRoom = () => {
    console.log('join room');
  };

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
          joinRoom={joinRoom}
        />
      }
    </div>
  );
};

export default App;
