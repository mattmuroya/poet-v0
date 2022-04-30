import { useState } from 'react';
import io from 'socket.io-client';

import SignOn from './components/SignOn';

// proxy localhost:3001 in dev mode
let socket = io.connect('/');
console.log(socket);

const App = () => {
  // const [connected, setConnected] = useState(true);
  
  // const handleClick = () => {
  //   connected ? socket.disconnect() : socket = io.connect('/');
    
  //   setConnected(!connected);
  // };

  const handleLogin = (screenName, password) => {
    console.log(screenName, password);
  };

  return (
    <div>
      <SignOn handleLogin={handleLogin} />
    </div>
  );
};

export default App;
