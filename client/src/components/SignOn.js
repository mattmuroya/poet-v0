import { useState } from 'react';

const SignOn = ({ handleSignOn }) => {
  const [screenName, setScreenName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>Sign On</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignOn(screenName, password)}
        }
      >
        <div>
          <label htmlFor="screen-name">Screen Name</label>
          <input
            id="screen-name"
            type="text"
            onChange={(e) => setScreenName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign On</button>
      </form>
    </div>
  );
};

export default SignOn;
