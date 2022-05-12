import { useState, useEffect } from 'react';
import axios from 'axios';

const UserSearch = ({ user }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/users');
      setUserList(res.data);
    })();
  }, []);

  const sendInvite = async (userId) => {
    const invitedUser = await axios.put(`/api/users/${userId}`, {}, {
      headers: {
        Authorization: `bearer ${user.token}`
      }
    });
    const newUserList = userList.map(elem => {
      if (elem.id === invitedUser.data.id) {
        return invitedUser.data;
      }
      return elem;
    });
    setUserList(newUserList);
  };

  return (
    <div>
      <p>invite someone to chat:</p>
      <ul>
        {userList.filter(elem => (
          elem.id !== user.id
          // not already in buddy list
          && !user.buddyList.some(buddy => buddy.id === elem.id)
        ))
        .map(elem => (
          <li key={elem.id}>
            {elem.screenName}
            {elem.invites.includes(user.id)
              ? <button disabled>invite sent</button>
              : <button onClick={() => sendInvite(elem.id)}>send invite</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
