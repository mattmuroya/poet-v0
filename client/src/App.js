import io from 'socket.io-client';

// proxy localhost:3001 in dev mode
io.connect('/');

const App = () => {
  return (
    <div>App</div>
  );
};

export default App;
