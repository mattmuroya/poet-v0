import { useEffect, useState } from 'react';

const ChatWindow = ({ socket, room }) => {

  const [messages, setMessages] = useState(['message', 'message', 'message', 'message']);

  // useEffect(() => {
  //   socket.on('receive_message', message => {
  //     console.log('message received by client');
  //     setMessages(prevMessages => [...prevMessages, message]);
  //   });
  // }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    // const newMessage = 'here is a new message';
    // socket.emit('send_message', newMessage);
    // setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <div>
      <p>current room: {room.id}</p>
      <p>users:</p>
      <ul>
        {room.users.map(user => (
          <li key={user.id}>{user.screenName}</li>
        ))}
      </ul>
      <div>
        <ul>
          {messages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
        <form onSubmit={sendMessage}>
          <input type="text" placeholder="send a message" />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
