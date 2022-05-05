import { useEffect, useState } from 'react';
const ChatWindow = ({ socket, user, room }) => {

  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');

  const otherUsers = room.users.filter(roomUser => roomUser.id !== user.id);

  useEffect(() => {
    socket.on('receive_message', incomingMessageHandler);
     return () => {
       socket.off('receive_message', incomingMessageHandler);
     }
  }, [socket]);

  const incomingMessageHandler = message => {
    console.log('incoming message received: ', message.text);
    setMessages(prevMessages => [...prevMessages, message]);
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessageText.trim() === '') return;
    const newMessage = {
      text: newMessageText,
      room: room.id,
      author: user.id
    };
    socket.emit('send_message', newMessage);
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setNewMessageText('');
  };


  return (
    <div>
      <p>currently chatting with:</p>
      <ul>
        {otherUsers.map(user => (
          <li key={user.id}>{user.screenName}</li>
        ))}
      </ul>
      <div>
        <h2>chat</h2>
        <ul>
          {messages.map((message, i) => (
            <li key={i}>{message.text}</li>
          ))}
        </ul>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={newMessageText}
            placeholder="send a message"
            onChange={(e) => setNewMessageText(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
