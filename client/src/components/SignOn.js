import { useState } from 'react';

const SignOn = ({ handleSignOn, handleRegistration }) => {
  const [screenName, setScreenName] = useState('');
  const [password, setPassword] = useState('');
  const [registrationMode, setRegistrationMode] = useState(false);

  return (
    <div>
      <h2>{registrationMode? 'Register' : 'Sign On'}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          !registrationMode && handleSignOn(screenName, password);
          registrationMode && handleRegistration(screenName, password);
        }}
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
        <button type="submit">{registrationMode? 'Register' : 'Sign On'}</button>
      </form>
      <button onClick={() => setRegistrationMode(!registrationMode)}>
        {registrationMode ? 'Already have a Screen Name?' : 'Need a Screen Name?'}
      </button>
    </div>
  );
};

export default SignOn;
