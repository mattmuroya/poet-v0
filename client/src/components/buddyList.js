import { useState, useEffect } from 'react';
import axios from 'axios';

import UserSearch from './UserSearch';

const BuddyList = ({ user, handleSignOut, joinRoom }) => {
  
  return (
    <div>
      <span>hello, {user.screenName}</span>
      <button onClick={handleSignOut}>sign out</button>
      <UserSearch user={user} />
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
