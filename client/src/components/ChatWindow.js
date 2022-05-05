const ChatWindow = ({ room }) => {
  return (
    <div>
      <p>current room: {room.id}</p>
      <p>users:</p>
      <ul>
        {room.users.map(user => (
          <li key={user.id}>{user.screenName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatWindow;
