import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const UserSearch = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/users');
        const users = res.data.map(user => {
          return { value: user.screenName, label: user.screenName };
        });
        setUserList(users);
        console.log(users);
    })();
  }, []);

  return (
    <div>
      <p>invite someone to chat:</p>
      <Select
        classNamePrefix='react-select'
        options={userList}
      />
    </div>
  );
};

export default UserSearch;
