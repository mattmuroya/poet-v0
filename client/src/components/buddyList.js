const buddyList = ({ user, handleSignOut, joinRoom }) => {
  return (
    <div>
      <p>hello, {user.screenName}</p>
      <p>your buddies:</p>
      <ul>
        {user.buddyList.map(buddy => (
          <li key={buddy.id}>{buddy.screenName}</li>
        ))}
      </ul>
      <button onClick={handleSignOut}>sign out</button>
      <button onClick={joinRoom}>join room</button>
    </div>
  );
};

export default buddyList;
