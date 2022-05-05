const buddyList = ({ user, room, handleSignOut, joinRoom }) => {
  
  return (
    <div>
      <span>hello, {user.screenName}</span>
      <button onClick={handleSignOut}>sign out</button>
      <p>your buddies:</p>
      <ul>
        {user.buddyList.map(buddy => (
          <li key={buddy.id}>
            <button onClick={() => joinRoom(user.id, buddy.id)}>{buddy.screenName}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default buddyList;
