const BuddyList = ({ user, handleSignOut, joinRoom }) => {
  
  return (
    <div>
      <p>your buddy list:</p>
      <ul>
        {user.buddyList.map(buddy => (
          <li key={buddy.id}>
            <button onClick={() => joinRoom(user.id, buddy.id)}>
              {buddy.screenName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuddyList;
