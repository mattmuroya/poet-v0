const buddyList = ({ user, room, handleSignOut, joinRoom }) => {
  return (
    <div>
      <p>hello, {user.screenName}</p>
      {room && <p>current room: {room.id}</p>}
      <p>your buddies:</p>
      <ul>
        {user.buddyList.map(buddy => (
          <li key={buddy.id}>
            {buddy.screenName}
            <button onClick={() => joinRoom(user.id, buddy.id)}>join room</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSignOut}>sign out</button>
    </div>
  );
};

export default buddyList;
