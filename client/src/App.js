import { useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

import SignOn from './components/SignOn';

const App = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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
      setUser({ screenName: res.data.screenName });
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

  return (
    <div>
      {!user &&
        <div>
          <SignOn handleSignOn={handleSignOn} />
          {errorMessage}
        </div>
      }
      {user &&
        <div>
          hello, {user.screenName}
          <button onClick={handleSignOut}>sign out</button>
        </div>
      }
    </div>
  );
};

export default App;
