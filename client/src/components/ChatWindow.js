import axios from 'axios';
import { useEffect, useState } from 'react';
const ChatWindow = ({ socket, user, room }) => {

  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');

  const otherUsers = room.users.filter(roomUser => roomUser.id !== user.id);

  useEffect(() => {
    (async () => {
      const messages = await axios.get('/api/messages', {
        headers: {
          Authorization: `bearer ${user.token}`
        },
        params: {
          room: room.id
        }
      });
      setMessages(messages.data);
    })();
  }, [user, room]);

  useEffect(() => {
    socket.on('receive_message', incomingMessageHandler);
     return () => {
       socket.off('receive_message', incomingMessageHandler);
     }
  }, [socket]);

  const incomingMessageHandler = message => {
    setMessages(prevMessages => [...prevMessages, message]);
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      if (newMessageText.trim() === '') return;
      const newMessage = {
        author: user.screenName,
        text: newMessageText,
        room: room.id,
      };
      await axios.post('/api/messages', newMessage, {
        headers: {
          Authorization: `bearer ${user.token}`
        }
      })
      socket.emit('send_message', newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setNewMessageText('');
    } catch (err) {
      console.error(err.response.data);
    }
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
            <li key={i}>
              {message.author.screenName || message.author}: {message.text}
            </li>
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
